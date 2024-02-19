import {BelongsTo, BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {PostModel} from "../post/post.model";
import {PostPageModel} from "../post/post-page.model";
import {ApiProperty} from "@nestjs/swagger";
import {StatusModel} from "../status/status.model";
import {PageStatusModel} from "./page-status.model";

@Table({tableName: "pages", timestamps: false, updatedAt: false})
export class PageModel extends Model<PageModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор страницы"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  page_id: number;

  @ApiProperty({example: "Главная страница", description: "Название страницы"})
  @Column({type: DataType.STRING, allowNull: false})
  title: string;

  @ApiProperty({example: "main-page", description: "slug страницы, то что будет в url"})
  @Column({type: DataType.STRING, allowNull: false, unique: true})
  slug: string;

  @ApiProperty({example: 0, description: "Порядок страницы, отразится на менюшке"})
  @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
  menu_order: number;

  @BelongsToMany(() => PostModel, () => PostPageModel)
  posts: PostModel[];

  @BelongsToMany(() => StatusModel, () => PageStatusModel)
  status: StatusModel
}