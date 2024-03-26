import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class  CreateSizeDto {
  @ApiProperty({example: "image_1024.webp", description: "Размер изображения(large)"})
  @IsNotEmpty()
  @IsString()
  readonly large: string;

  @ApiProperty({example: "image_300.webp", description: "Размер изображения(medium)"})
  @IsNotEmpty()
  @IsString()
  readonly medium: string;

  @ApiProperty({example: "image_150.webp", description: "Размер изображения(thumbnail)"})
  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;
}