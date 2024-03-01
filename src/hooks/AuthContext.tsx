/* eslint-disable react/jsx-no-constructed-context-values */
// /* eslint-disable react/jsx-no-constructed-context-values */
// /* eslint-disable consistent-return */
// /* eslint-disable react/prop-types */
// /* eslint-disable camelcase */
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { STORAGE_KEY, STORAGE_KEY_TOKEN } from '@types';
import * as LocalAuthentication from 'expo-local-authentication';
import { useToast } from 'native-base';
import React, { ReactNode, createContext, useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { IUserDtos } from '../dtos';
import { api } from '../services/api';
import { routesScheme } from '../services/schemeRoutes';
import { TokenStorage } from '../storage/token-storage';
import { AppError } from '../utils/AppError';

interface ILogin {
  membro: string;
  senha: string;
}

interface IAuthContextData {
  user: IUserDtos;
  login(credential: ILogin): Promise<void>;
  loading: boolean;
  logOut(): Promise<void>;
  updateUser(user: IUserDtos): Promise<void>;
}

type TAuthContext = {
  children: ReactNode;
};

type AuthState = {
  token: string;
  user: IUserDtos;
};

export const AuthContext = createContext<IAuthContextData>(
  {} as IAuthContextData,
);

export function AuthContextProvider({ children }: TAuthContext) {
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const [data, setData] = useState<AuthState>({} as AuthState);
  const storageToken = new TokenStorage();

  const userAndTokenUpdate = React.useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    await api.get('/user/find-user-by-id').then(async h => {
      const user = h.data;
      setData({ token, user });
    });
  }, []);

  const LoadingUser = useCallback(async () => {
    setLoading(true);

    const token = await storageToken.getToken();

    if (token) {
      userAndTokenUpdate(token);
    }

    setLoading(false);
  }, [storageToken, userAndTokenUpdate]);

  React.useEffect(() => {
    LoadingUser();
  }, []);

  const login = useCallback(async ({ membro, senha }: ILogin) => {
    try {
      await api
        .post(routesScheme.users.login, {
          membro,
          senha,
        })
        .then(async h => {
          const { token } = h.data;
          api.defaults.headers.common.Authorization = `Bearer ${token}`;

          await api.get('/user/find-user-by-id').then(async h => {
            const user = h.data;
            setData({ token, user });

            await storageToken.setToken(token);
          });
        });
    } catch (error) {
      const isError = error instanceof AppError;
      const title = isError
        ? error.message
        : 'Não foi possível entrar na sua conta, tente novamente mais tarde';

      if (isError) {
        toast.show({
          title,
          description: title,
          placement: 'bottom',
          bgColor: 'red.500',
        });
      } else {
        toast.show({
          title,
          description:
            'Estamos com um problema no servidor, tente novamente mais tarde',
          placement: 'bottom',
          bgColor: 'red.500',
        });
      }
    }
  }, []);

  const logOut = useCallback(async () => {
    await storageToken.removeToken();
    setData({} as AuthState);
  }, [data]);

  const updateUser = useCallback(
    async (user: IUserDtos) => {
      // await AsyncStorage.setItem(key, JSON.stringify(user));

      const dados = {
        token: data.token,
        user,
      };

      setData(dados);
    },
    [data.token],
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

  React.useEffect(() => {
    const out = api.registerIntercepTokenManager(tokkenFail);

    return () => {
      out();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, login, logOut, loading, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
