import {create} from "zustand";
import {IUser, IUserStore} from "@/@types/user";

export const userStore = create<IUserStore>()((set) => ({
  user: null,
  is_auth: false,
  setUser: (data: IUser) => set(() => (
    {
      user: data
    }
  )),
  setAuth: (is_auth: boolean) => set(() => (
    {
      is_auth: is_auth
    }
  ))

}))