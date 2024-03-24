import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosError} from "axios";
import globalRouter from "@/hooks/global-router";
import {userStore} from "@/store/user-store";
import {refresh_session} from "@/http/auth-http";

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

  headers.authorization = `Bearer ${localStorage.getItem('jwtToken')}`;

  return config;
})

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {


  if (error.response.status !== 401 && !error.config) {
    throw error;
  }

  return await refresh_session(error);
};

$apiAuth.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  return config;
}, onResponseError)

export {
  $api, $apiAuth
}