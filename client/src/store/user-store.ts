import {create} from "zustand";
import {IUser} from "@/@types/user";

interface IUserStore {
  users: IUser[];
  setUsers: (users: IUser[]) => void
}

const userStore = create<IUserStore>()((set) => ({
  users: [],
  setUsers: (newUsers) => set((state) => ({users: state.users = newUsers}))
}))