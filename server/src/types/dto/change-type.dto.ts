import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ChangeTypeDto {

  @ApiProperty({example: 1, description: "Уникальный идентификатор записи"})
  @IsNotEmpty()
  @IsNumber()
  readonly type_id: number;

  @ApiProperty({example: "file", description: "значение"})
  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @ApiProperty({example: "Описание файла", description: "Описание значения"})
  @IsString()
  readonly description: string;
}