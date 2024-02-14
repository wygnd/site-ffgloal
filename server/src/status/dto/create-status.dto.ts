import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateStatusDto {
  @ApiProperty({example: "Publish", description: "Значение статуса"})
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @ApiProperty({example: "Опубликованно", description: "Описание статуса"})
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}