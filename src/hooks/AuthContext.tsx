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
  const toast = useToast();
  const [data, setData] = useState<AuthState>({} as AuthState);
  const storageToken = new TokenStorage();

  const { mutations } = make()

  const { mutateAsync: session } = mutations.session()
  const { mutateAsync: saveOnStorage } = mutations.saveOnStorage()
  const { mutateAsync: getUserById } = mutations.getUserById()
  const { mutateAsync: deleteStorage } = mutations.deleteOnStorage()



  const userAndTokenUpdate = React.useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const userById = await getUserById()

    setData({ token, user: userById });
    OneSignal.User.addTag('apelido', userById.apelido)
  }, []);

  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const token = await storageToken.getToken();

    if (token) {
      userAndTokenUpdate(token);
    }

    setLoading(false);
  }, []);

  React.useEffect(() => {
    LoadingUser();
  }, []);

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

      OneSignal.User.addTag('apelido', obj.apelido)


    } catch (error) {
      showMessage(error)
    }

  }, []);

  const logOut = useCallback(async () => {
    await deleteStorage('geb:token')
    setData({} as AuthState);
  }, [data]);

  const updateUser = useCallback(
    async () => {
      const token = await storageToken.getToken();
      if (token) {
        userAndTokenUpdate(token);
      }
    },
    [],
  );

  const tokkenFail = React.useCallback(async () => {
    logOut();
    toast.show({
      title: 'Seu token expirou.',
      description: 'Entre novamente com suas credenciais',
      placement: 'bottom',
      bg: 'red.500',
    });
  }, [logOut, toast]);



  return (
    <AuthContext.Provider
      value={{ user: data.user, login, logOut, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
