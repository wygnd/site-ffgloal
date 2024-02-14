import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../users/user.model";
import {RolesModel} from "./roles.model";

@Table({tableName: "users_roles", createdAt: false, timestamps: false, updatedAt: false})
export class UserRolesModel extends Model<UserRolesModel> {
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  object_id: number;

  @ForeignKey(() => UserModel)
  @Column({type: DataType.INTEGER})
  user_id: number;

  @ForeignKey(() => RolesModel)
  @Column({type: DataType.INTEGER})
  role_id: number;
}