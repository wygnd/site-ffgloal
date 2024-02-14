import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserRolesModel} from "./user-roles.model";
import {UserModel} from "../users/user.model";

@Table({tableName: "roles", createdAt: false, timestamps: false, updatedAt: false})
export class RolesModel extends Model<RolesModel> {
  @ApiProperty({example: "1", description: "Уникальный идентификатор роли"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  role_id: number;

  @ApiProperty({example: "ADMIN", description: "роль"})
  @Column({type: DataType.STRING, unique: true})
  value: string;

  @ApiProperty({example: "Администратор", description: "Описание роли"})
  @Column({type: DataType.STRING})
  description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  roles: UserModel[];
}