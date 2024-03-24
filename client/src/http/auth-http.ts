import {ISignInResponse, IUserAuth} from "@/@types/user";
import {$api} from "@/http/index";
import globalRouter from "@/hooks/global-router";
import {AxiosError} from "axios";

export async function sign_in(user: IUserAuth) {
  try {
    const response = await $api.post<ISignInResponse>('/auth/signin', user);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export async function refresh_session(error: AxiosError) {
  try {
    // const {setAuth} = userStore();
    const response = await $api.get('/auth/refresh');
    localStorage.setItem('jwtToken', response.data.token);
    console.log(response.data.token)
    // setAuth(true);
    return Promise.reject(error);
  } catch (e) {
    console.log(e);
    console.log('Пользователь не авторизован');
    globalRouter.navigate("/auth");
  }
};