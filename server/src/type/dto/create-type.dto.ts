import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateTypeDto {
  @ApiProperty({example: "image", description: "Тип файла"})
  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @ApiProperty({example: "Картинка", description: "Описание типа файла"})
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}