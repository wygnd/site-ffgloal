export interface IUser {
  user_id: number;
  name: string;
  email: string;
  avatar?: string;
  roles?: IRole[]
}

export interface IRole {
  role_id: number;
  value: string;
  description: string;
}

export interface IUserAuth {
  email: string;
  password: string;
}

export interface IUserStore {
  user: IUser;
  is_auth: boolean;
  setUser: (users: any) => void;
  setAuth: (is_auth: boolean) => void
}

export interface ISignInResponse {
  token: string;
  user: IUser
}