/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios';

import { AppError } from '../utils/AppError';
import Toast from '../components/toast/handler';

type PromiseType = {
  onSucess: (token: string) => void;
  onFail: (error: AxiosError) => void;
};
type SignOut = () => void;

type APIInstaceProps = AxiosInstance & {
  registerIntercepTokenManager: (signOut: SignOut) => () => void;
};

const dev = 'http://192.168.0.107:3333';
const production = 'https://geb-server.appcom.dev'

const api = axios.create({
  baseURL: dev,
})

// let failedQuery: Array<PromiseType> = [];
let isRefreshing = false;


function statusCode(code: number, error: string) {
  switch (code) {
    case 401:
      throw new AppError(error);
    case 403:
      throw new AppError('Acesso não permitido');
    case 404:
      throw new AppError('Recurso não encontrado');

    case 409:
      throw new AppError('error');
    case 500:
      throw new AppError('Ocorreu um erro interno');
    default:
      return code;
  }
}

api.interceptors.response.use(
  res => {
    return res;
  },
  (error: AxiosError) => {
    const message = error?.response?.data?.error;
    const status = error.status


    if (status === 409) {
      return Promise.reject(new AppError(message))
    }

    if (status === 404) {
      Toast.show({
        title: 'Recurso não encontrado',
        description: 'Route not found',
        tipo: 'error',
      })
    }

    if (status === 401) {
      return Promise.reject(new AppError('Sua sessão expirou, faça login novamente'))
    }

    return Promise.reject(error)

    // console.log(error?.response?.data, 'error');
  },
);

export { api };

