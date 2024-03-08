import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UploadModel} from "../uploads/upload.model";

@Table({tableName: "types", timestamps: false, createdAt: false, updatedAt: false})
export class TypeModel extends Model<TypeModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор типа файла", required: true})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true, allowNull: false})
  type_id: number;

  @ApiProperty({example: "image", description: "Тип файла", required: true})
  @Column({type: DataType.STRING, allowNull: false})
  value: string;

  @ApiProperty({example: "image", description: "Описание типа файла", required: false, default: ""})
  @Column({type: DataType.STRING, defaultValue: ""})
  description: string;

  @HasOne(() => UploadModel)
  upload_type: UploadModel;
}