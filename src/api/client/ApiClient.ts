import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Auth } from '../auth';
import { StatusCode } from '../StatusCode';
import qs from 'qs';

// const tokenType = 'Bearer';

export const baseUrl = process.env.APP_BASE_URL;
const setAuthHeader = (config: any, token: string | null): void => {
  config.headers.Authorization = `${token}`;
};

export const apiClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: 'repeat' });
  },
});

apiClient.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = Auth.token;
  setAuthHeader(config, token);

  return config;
});

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    if (error.response.status === StatusCode.Unauthorized) {
      console.log('status = 401');
      Auth.authorize();
    }
    return Promise.reject(error);
  }
);
