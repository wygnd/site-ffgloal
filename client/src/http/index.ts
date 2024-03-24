import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosError} from "axios";
import globalRouter from "@/hooks/global-router";

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
    throw error;
  }

  try {
    const response = await axios.get(`${process.env.SERVER_URL}/auth/refresh`, {
      withCredentials: true
    });
    localStorage.setItem('apiToken', response.data.token);
    return Promise.reject(error);
  } catch (e) {
    console.log('Пользователь не авторизован');
    globalRouter.navigate("/auth");
  }
};

$apiAuth.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  return config;
}, onResponseError)

export {
  $api, $apiAuth
}