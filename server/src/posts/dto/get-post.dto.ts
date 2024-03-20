import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber} from "class-validator";

export class GetPostDto {
  @ApiProperty({example: 1, description: "ID записи", required: true})
  @IsNotEmpty()
  @IsNumber()
  readonly post_id: string;

  @ApiProperty({
    example: ["post_id", "title", "content"],
    description: "Атрибуты поста, которые нужно вывести, по дефолту выводятся все",
    required: false
  })
  readonly attributes?: string[];
}