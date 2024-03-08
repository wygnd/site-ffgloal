import {IsNotEmpty} from "class-validator";
import {ApiExtension, ApiProperty} from "@nestjs/swagger";
import {PostModel} from "../post.model";

export class ChangePostDto {
  @ApiProperty({example: 1, description: "Уникальный идентификатор записи", required: true})
  @IsNotEmpty()
  readonly post_id: number;

  @ApiProperty({example: "first-post", description: "Название записи", required: false})
  readonly title: string;

  @ApiProperty({example: "post content", description: "Контент записи", required: false})
  readonly content: string;

  @ApiProperty({example: "Первая запись", description: "Название записи", required: false})
  readonly name: string;

  @ApiProperty({example: 0, description: "Порядок записи", required: false})
  readonly menu_order: number;
}