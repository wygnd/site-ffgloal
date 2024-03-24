import {create} from "zustand";
import {IUser} from "@/@types/user";

interface IUserStore {
  is_auth: boolean;
  setUserData: (users: any) => void
}

const userStore = create<IUserStore>()((set) => ({
  is_auth: false,
  setUserData: (data: IUser) => set(state => (
    {}
  ))
}))