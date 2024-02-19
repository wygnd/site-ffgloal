import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {PageModel} from "./page.model";
import {StatusModel} from "../status/status.model";

@Table({tableName: "page_status", timestamps: false, createdAt: false, updatedAt: false})
export class PageStatusModel extends Model<PageStatusModel> {
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true, allowNull: false})
  page_status_id: number;

  @ForeignKey(() => PageModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  page_id: number;

  @ForeignKey(() => StatusModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  status_id: number;
}