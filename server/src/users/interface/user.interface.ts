import {IRole} from "../../roles/interface/role.interface";

export interface IUser {
  user_id: number;
  email: string;
  roles: IRole[];
}