import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ChangeSettingDto {
  @ApiProperty({example: 1, description: "Уникальный идентификатор записи"})
  @IsNotEmpty()
  @IsNumber()
  readonly setting_id: number;

  @ApiProperty({example: "site-title", description: "Название поля"})
  @IsNotEmpty()
  @IsString()
  readonly meta_key: string;

  @ApiProperty({example: "site_title", description: "Значение поля"})
  @IsNotEmpty()
  @IsString()
  readonly meta_value: string;
}