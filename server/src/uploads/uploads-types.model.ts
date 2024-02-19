import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {UploadModel} from "./upload.model";
import {TypeModel} from "../type/type.model";
import {SizeModel} from "../size/size.model";

@Table({tableName: 'uploads_types', timestamps: false, createdAt: false, updatedAt: false})
export class UploadsTypesModel extends Model<UploadsTypesModel>{
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  object_id: number;

  @ForeignKey(() => UploadModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  upload_id: number;

  @ForeignKey(() => TypeModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  type_id: number;


}