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

interface IUserAuth {
  email: string;
  password: string;
}