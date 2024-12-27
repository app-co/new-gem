import { useToast } from 'native-base';
import React, { ReactNode, createContext, useCallback, useState } from 'react';

import { OneSignal } from 'react-native-onesignal';
import { IUserDtos } from '../dtos';
import { api } from '../services/api';
import { routesScheme } from '../services/schemeRoutes';
import { TokenStorage } from '../storage/token-storage';
import { AppError } from '../utils/AppError';
import { TSession } from './dto/types';
import { make } from '.';
import { IUser } from './dto/interfaces';
import { showMessage } from './messageError';

interface ILogin {
  membro: string;
  senha: string;
}

interface IAuthContextData {
  user: IUser;
  login(credential: TSession): Promise<void>;
  loading: boolean;
  logOut(): Promise<void>;
  updateUser(): Promise<void>;
}

type TAuthContext = {
  children: ReactNode;
};

type AuthState = {
  token: string;
  user: IUser;
};

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData,
);

export function AuthContextProvider({ children }: TAuthContext) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AuthState>({} as AuthState);

  const { mutations } = make()

  const { mutateAsync: session, isLoading: loadSession } = mutations.session()
  const { mutateAsync: saveOnStorage, isLoading: loadSaveOnStorage } = mutations.saveOnStorage()
  const { mutateAsync: getUserById, isLoading: loadGetById } = mutations.getUserById()
  const { mutateAsync: deleteStorage } = mutations.deleteOnStorage()
  const { mutateAsync: getOnStorage, isLoading } = mutations.getOnStorage()



  const userAndTokenUpdate = React.useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const userById = await getUserById()

    setData({ token, user: userById });
    OneSignal.User.addTag('apelido', userById.apelido)
  }, []);

  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const token = await getOnStorage('geb:token')

    if (token) {
      userAndTokenUpdate(token);
    }

    setLoading(false);
  }, []);

  React.useEffect(() => {
    LoadingUser();
  }, []);

  React.useEffect(() => {
    setLoading(loadGetById || loadSaveOnStorage || loadSession || isLoading)
  }, [loadGetById, loadSaveOnStorage, isLoading, loadSession]);

  const login = useCallback(async (obj: TSession) => {
    try {
      const { token } = await session(obj)
      await saveOnStorage({
        key: 'geb:token',
        value: token,
      })

      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      const userById = await getUserById()

      setData({
        user: userById,
        token
      })

      OneSignal.User.addTag('userId', userById.id)


    } catch (error) {
      showMessage(error)
    }

  }, []);

  const logOut = useCallback(async () => {
    console.log('logOut')
    await deleteStorage('geb:token')
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async () => {
      const token = await getOnStorage('geb:token');
      if (token) {
        userAndTokenUpdate(token);
      }
    },
    [],
  );





  return (
    <AuthContext.Provider
      value={{ user: data.user, login, logOut, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
