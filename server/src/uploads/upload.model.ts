import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PostModel} from "../post/post.model";

@Table({tableName: "uploads", updatedAt: false})
export class UploadModel extends Model<UploadModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор файла", required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  upload_id: number;

  @ApiProperty({example: "logo", description: "Название файла", required: true})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({example: ".mp4", description: "Расширение файла", required: true})
  @Column({type: DataType.STRING, allowNull: false})
  ext: string;

  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя, который загрузил файл",
    required: true
  })
  @ForeignKey(() => PostModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  author_id: number;

  @ApiProperty({
    example: "124MB",
    description: "Размер файла (для последующей фильтрации и отчистке файлов)",
    required: true
  })

  @Column({type: DataType.STRING, allowNull: false})
  weight: string;
}