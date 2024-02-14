import {IsNotEmpty} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class ChangePostStatusDto {
  @ApiProperty({example: "1", description: "Уникальный идентификатор записи"})
  @IsNotEmpty()
  readonly post_id: string;

  @ApiProperty({example: "1", description: "Уникальный идентификатор статуса"})
  @IsNotEmpty()
  readonly status_id: string;
}