import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PostModel} from "./post.model";

@Table({tableName: "post_meta", createdAt: false, timestamps: false, updatedAt: false})
export class PostMetaModel extends Model<PostMetaModel> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор меты"})
    @Column({type: DataType.STRING, unique: true, primaryKey: true, autoIncrement: true})
    meta_id: number;

    @ForeignKey(() => PostModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    post_id: number;

    @ApiProperty({example: "second_title", description: "Название мета поля"})
    @Column({type: DataType.STRING, allowNull: false})
    meta_key: string;

    @ApiProperty({example: "Заголовок 2", description: "Значение мета поля"})
    @Column({type: DataType.TEXT('long'), allowNull: false})
    meta_value: string;

    // @BelongsTo(() => PostModel)
    // post: PostModel
}