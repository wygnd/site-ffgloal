import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {StatusModel} from "../status/status.model";
import {PostStatusModel} from "./post-status.model";
import {UserModel} from "../users/user.model";
import {IsJSON, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {PageModel} from "../page/page.model";
import {PostPageModel} from "./post-page.model";

@Table({tableName: "posts", updatedAt: false})
export class PostModel extends Model<PostModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор поста"})
  @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
  post_id: number;

  @ApiProperty({example: 1, description: "Уникальный идентификатор пользователя, создавшего запись"})
  @ForeignKey(() => UserModel)
  @Column({type: DataType.INTEGER})
  @IsNotEmpty()
  @IsNumber()
  author_id: number;

  @ApiProperty({example: "main-page", description: "Заголовок записи"})
  @Column({type: DataType.STRING, allowNull: false})
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({example: "Это первая запись...", description: "Контент/описание записи"})
  @Column({type: DataType.JSONB})
  @IsJSON()
  content: string;

  @ApiProperty({example: "Гланвая страница", description: "Название записи"})
  @Column({type: DataType.STRING, allowNull: false})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({example: 0, description: "Позиция в меню", default: 0})
  @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
  menu_order: number;

  @ApiProperty({example: "page", description: "Тип записи (страница, блок, меню и тд)"})
  @Column({type: DataType.STRING, allowNull: false})
  @IsNotEmpty()
  @IsString()
  type: string;

  @BelongsToMany(() => StatusModel, () => PostStatusModel)
  status: StatusModel;

  @BelongsToMany(() => PageModel, () => PostPageModel)
  pages: PageModel[];
}