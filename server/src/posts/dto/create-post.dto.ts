import {IsJSON, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({example: "main-page", description: "Название записи"})
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({example: "Это главная страница...", description: "Описание записи"})
  @IsJSON()
  readonly content: string;

  @ApiProperty({example: "Главная страница", description: "Заголовок записи"})
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({example: "page", description: "тип записи"})
  @IsString()
  @IsNotEmpty()
  readonly type: string;

  @ApiProperty({example: 0, description: "Позиция записи", required: false, default: 0})
  menu_order: number;
}