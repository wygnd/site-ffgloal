import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: "settings", createdAt: false, updatedAt: false, timestamps: false})
export class SettingModel extends Model<SettingModel> {
  @ApiProperty({example: 1, description: "Униакльный идентификатор записи", required: true})
  @Column({type: DataType.INTEGER, allowNull: false, unique: true, primaryKey: true, autoIncrement: true})
  setting_id: number;

  @ApiProperty({example: "site-name", description: "Название поля", required: true})
  @Column({type: DataType.STRING, allowNull: false})
  meta_key: string;

  @ApiProperty({example: "site_title", description: "Значение поля", required: true})
  @Column({type: DataType.STRING, allowNull: false})
  meta_value: string;
}