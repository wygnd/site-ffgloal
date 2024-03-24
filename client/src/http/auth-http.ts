import {IUserAuth} from "@/@types/user";
import {$api} from "@/http/index";

export async function sign_in(user: IUserAuth) {
  try {
    const response = await $api.post('/auth/signin', user);
    return response.data;
  } catch (e) {
    console.log(e);
    return null;
  }

}