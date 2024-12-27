/* eslint-disable no-async-promise-executor */
import axios, { AxiosError, AxiosInstance } from 'axios';

import { AppError } from '../utils/AppError';
import Toast from '../components/toast/handler';

type SignOut = () => void;

type APIInstaceProps = AxiosInstance & {
  registerIntercepTokenManager: (signOut: SignOut) => () => void;
};

const dev = 'http://192.168.0.66:3333';
const production = 'https://geb-server.appcom.dev'


type PromiseType = {
  onSucess: (token: string) => void;
  onFail: (error: AxiosError) => void;
};

const api = axios.create({
  baseURL: production,
})

let failedQuery: Array<PromiseType> = [];
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

// api.registerIntercepTokenManager = signOut => {
//   const registerIntercepToken = api.interceptors.response.use(
//     config => config,
//     async requesRrror => {
//       const erro = requesRrror?.response?.data;
//       console.log('api', requesRrror?.response)

//       statusCode(requesRrror.status)

//       // if (requesRrror?.response && erro) {
//       //   const { message } = erro;
//       //   if (message === 'token inválido' || message === 'falta o token') {
//       //     const originalRequest = requesRrror.config;

//       //     // if (isRefreshing) {
//       //     //   return new Promise((resolve, reject) => {
//       //     //     failedQuery.push({
//       //     //       onSucess: (token: string) => {
//       //     //         originalRequest.headers = {
//       //     //           Authorization: `Bearer ${token}`,
//       //     //         };
//       //     //         resolve(api(originalRequest));
//       //     //       },
//       //     //       onFail: (axioxError: AxiosError) => {
//       //     //         reject(axioxError);
//       //     //       },
//       //     //     });
//       //     //   });
//       //     // }

//       //     isRefreshing = true;

//       //     return new Promise(async (resolve, reject) => {
//       //       // try {
//       //       //   const { data } = await api.post('/user/refresh-token');
//       //       //   storageToken.setToken(data.token);

//       //       //   if (originalRequest.data) {
//       //       //     originalRequest.data = JSON.parse(originalRequest.data);
//       //       //   }

//       //       //   originalRequest.headers = {
//       //       //     Authorization: `Bearer ${data.token}`,
//       //       //   };

//       //       //   api.defaults.headers.common.Authorization = `Bearer ${data.token}`;

//       //       //   failedQuery.forEach(request => {
//       //       //     request.onSucess(data.token);
//       //       //   });

//       //       //   console.log('TOKEN ATUALIZADO');
//       //       // } catch (error: any) {
//       //       //   failedQuery.forEach(h => {
//       //       //     h.onFail(error);
//       //       //   });
//       //       //   signOut();
//       //       //   console.log(error, 'promise');
//       //       //   reject(error);
//       //       // } finally {
//       //       //   isRefreshing = false;
//       //       //   failedQuery = [];
//       //       // }
//       //     });

//       //     // return Promise.reject(requesRrror);
//       //   }


//       //   return Promise.reject(new AppError(message));
//       // }

//       return Promise.reject(erro);
//     },
//   );

//   return () => {
//     api.interceptors.response.eject(registerIntercepToken);
//   };
// };



// export const socket = soketio(production);

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

