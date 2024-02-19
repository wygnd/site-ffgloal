import {Column, DataType, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {UploadsTypesModel} from "../uploads/uploads-types.model";
import {UploadModel} from "../uploads/upload.model";

@Table({tableName: "sizes", timestamps: false, updatedAt: false, createdAt: false})
export class SizeModel extends Model<SizeModel> {
  @ApiProperty({example: 1, description: "Уникальный иденитфикатор", required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false, primaryKey: true})
  size_id: number;

  @ApiProperty({example: "image_1024.webp", description: "Размер изображения(large)"})
  @Column({type: DataType.STRING, allowNull: false})
  large: string;

  @ApiProperty({example: "image_300.webp", description: "Размер изображения(medium)"})
  @Column({type: DataType.STRING, allowNull: false})
  medium: string;

  @ApiProperty({example: "image_150.webp", description: "Размер изображения(thumbnail)"})
  @Column({type: DataType.STRING, allowNull: false})
  thumbnail: string;

  @HasOne(() => UploadModel)
  upload_type: UploadModel;
}