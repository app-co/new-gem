/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios';

import { TokenStorage } from '../storage/token-storage';
import { AppError } from '../utils/AppError';

type SignOut = () => void;

type APIInstaceProps = AxiosInstance & {
  registerIntercepTokenManager: (signOut: SignOut) => () => void;
};

const dev = 'http://192.168.0.102:3333';
const production = 'https://geb-server.appcom.dev';

type PromiseType = {
  onSucess: (token: string) => void;
  onFail: (error: AxiosError) => void;
};

const api = axios.create({
  baseURL: production,
}) as APIInstaceProps;

let failedQuery: Array<PromiseType> = [];
let isRefreshing = false;

const storageToken = new TokenStorage();

api.registerIntercepTokenManager = signOut => {
  const registerIntercepToken = api.interceptors.response.use(
    config => config,
    async requesRrror => {
      const erro = requesRrror?.response?.data;
      console.log(requesRrror);
      if (requesRrror?.response && erro) {
        const { message } = erro;
        if (message === 'token inválido' || message === 'falta o token') {
          console.log(message, 'token epirou');
          const originalRequest = requesRrror.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQuery.push({
                onSucess: (token: string) => {
                  originalRequest.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequest));
                },
                onFail: (axioxError: AxiosError) => {
                  reject(axioxError);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise(async (resolve, reject) => {
            try {
              const { data } = await api.post('/user/refresh-token');
              storageToken.setToken(data.token);

              if (originalRequest.data) {
                originalRequest.data = JSON.parse(originalRequest.data);
              }

              originalRequest.headers = {
                Authorization: `Bearer ${data.token}`,
              };

              api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

              failedQuery.forEach(request => {
                request.onSucess(data.token);
              });

              console.log('TOKEN ATUALIZADO');
            } catch (error: any) {
              failedQuery.forEach(h => {
                h.onFail(error);
              });
              signOut();
              console.log(error, 'promise');
              reject(error);
            } finally {
              isRefreshing = false;
              failedQuery = [];
            }
          });

          // return Promise.reject(requesRrror);
        }

        if (message === 'Sua sessão expirou') {
          console.log(message);
          signOut();
          return Promise.reject(requesRrror);
        }

        return Promise.reject(new AppError(message));
      }

      return Promise.reject(erro);
    },
  );

  return () => {
    api.interceptors.response.eject(registerIntercepToken);
  };
};

export { api };

// export const socket = soketio(production);

// api.interceptors.response.use(
//   res => {
//     return res;
//   },
//   (error: AxiosError) => {
//     const message = error?.response?.data?.message;
//     const status = error?.response?.status;

//     console.log(error, 'api');

//     if (status === 401) {
//       console.log(message, 'api');
//     }

//     // console.log(error?.response?.data, 'error');
//   },
// );
