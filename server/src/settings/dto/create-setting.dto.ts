import {ApiProperty} from "@nestjs/swagger";

export class CreateSettingDto {
  @ApiProperty({example: "site-title", description: "Название поля"})
  readonly meta_key: string;

  @ApiProperty({example: "site_title", description: "Значение поля"})
  readonly meta_value: string;
}