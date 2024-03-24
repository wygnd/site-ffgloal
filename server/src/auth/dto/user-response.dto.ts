import {IRole} from "../../roles/interface/role.interface";
import {UserModel} from "../../users/user.model";

export class UserResponseDto {
  private user_id: number;
  private email: string;
  private name: string;
  private avatar: string | null;
  private roles: IRole[];

  constructor(userModel: UserModel) {
    this.user_id = userModel.user_id;
    this.email = userModel.email;
    this.name = userModel.name;
    this.avatar = userModel.avatar;
    this.roles = userModel.roles;
  }

}