import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UserModel} from "../users/user.model";

@Table({tableName: "tokens", createdAt: false, updatedAt: false, timestamps: false})
export class AuthModel extends Model<AuthModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор записи"})
  @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true})
  token_id: number;

  @ApiProperty({example: "gewsuygbfqhjiabeuiyhgwvb.efwgew", description: "Токен доступа", required: true})
  @Column({type: DataType.TEXT("medium"), allowNull: false})
  access_token: string;

  @ApiProperty({
    example: "gewsuygbfqhjiabeuiyhgwvb.efwgew",
    description: "Токен для обновления токена доступа",
    required: true
  })
  @Column({type: DataType.TEXT("medium"), allowNull: false})
  refresh_token: string;

  @ApiProperty({example: 1, description: "Внешний ключ, указываюший кому принадлежат токены", required: true})
  @ForeignKey(() => UserModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  user_id: number;

  @BelongsTo(() => UserModel)
  user_model: UserModel
}