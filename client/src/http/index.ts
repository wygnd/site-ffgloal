import axios, {AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {AxiosError} from "axios";
import globalRouter from "@/utils/global-router";
import {userStore} from "@/store/user-store";

const $api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

const $apiAuth = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

$apiAuth.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const {headers} = config;

  const token = localStorage.getItem('jwtToken');

  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  return config;
})

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const originalRequest = error.config;

  if (error.response.status !== 401 && !originalRequest) {
    throw error;
  }
  try {
    const response = await $api.get(`/auth/refresh`, {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
    // localStorage.setItem('jwtToken', response.data.access_token);
    // userStore.getState().setAuth(true)
    return Promise.reject(error);
  } catch (e) {
    console.log(e);
    console.log('Пользователь не авторизован 3');
    globalRouter.navigate("/auth");
  }
};

$apiAuth.interceptors.response.use((config: AxiosResponse): AxiosResponse => {
  return config;
}, onResponseError)

export {
  $api, $apiAuth
}