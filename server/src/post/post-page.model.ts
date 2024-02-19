import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PostModel} from "./post.model";
import {PageModel} from "../page/page.model";

@Table({tableName: "post_page", updatedAt: false, timestamps: false, createdAt: false})
export class PostPageModel extends Model<PostPageModel> {
  @Column({type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true})
  post_page_id: number;

  @ForeignKey(() => PostModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  post_id: number;

  @ForeignKey(() => PageModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  page_id: number;
}