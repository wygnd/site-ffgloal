import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PostModel} from "../post/post.model";
import {TypeModel} from "../type/type.model";
import {UploadsTypesModel} from "./uploads-types.model";
import {SizeModel} from "../size/size.model";

@Table({tableName: "uploads", updatedAt: false})
export class UploadModel extends Model<UploadModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор файла", required: true})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  upload_id: number;

  @ApiProperty({example: "logo", description: "Название файла", required: true})
  @Column({type: DataType.STRING, allowNull: false})
  name: string;

  @ApiProperty({
    example: "/static/files/text.txt",
    description: "Путь до файла, если изображение - путь до размера large"
  })
  @Column({type: DataType.STRING, allowNull: false})
  url: string;

  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя, который загрузил файл",
    required: true
  })
  @ForeignKey(() => PostModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  author_id: number;

  @ApiProperty({
    example: 124,
    description: "Размер файла (для последующей фильтрации и отчистке файлов)",
    required: true
  })
  @Column({type: DataType.INTEGER, allowNull: false})
  size: number;

  @BelongsToMany(() => TypeModel, () => UploadsTypesModel)
  type: TypeModel;

  @ForeignKey(() => SizeModel)
  @Column({type: DataType.INTEGER, allowNull: true, defaultValue: 0})
  size_id: number;

  @BelongsTo(() => SizeModel)
  size_model: SizeModel
}