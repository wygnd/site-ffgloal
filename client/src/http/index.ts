import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosError} from "axios";

const $api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true
})

const $apiAuth = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
})

$apiAuth.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const {headers} = config;

  headers.authorization = `Bearer ${localStorage.getItem('apiToken')}`;

  return config;
})

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {

  if (error.response.status !== 401 && !error.config) {
    window.history.go(-1);
    throw error;
  }

  try {
    const response = await axios.get(`${process.env.SERVER_URL}/auth/refresh`, {
      withCredentials: true
    });
    localStorage.setItem('apiToken', response.data.token);
    return Promise.reject(error);
  } catch (e) {
    window.history.go(-1)
    console.log('Пользователь не авторизован');
  }
};

$apiAuth.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  return config;
}, onResponseError)

export {
  $api, $apiAuth
}