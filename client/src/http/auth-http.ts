import {ISignInResponse, IUserAuth} from "@/@types/user";
import {$api, $apiAuth} from "@/http/index";
import globalRouter from "@/utils/global-router";
import {AxiosError} from "axios";
import {userStore} from "@/store/user-store";

export async function sign_in(user: IUserAuth) {
  try {
    const response = await $api.post<ISignInResponse>('/auth/signin', user);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

