import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {DefaultValuePipe} from "@nestjs/common";
import {ApiProperty} from "@nestjs/swagger";
import {Order, OrderBy} from "../utils/enums";

export class GetPostsDto {

  @ApiProperty({example: "page", description: "Тип записи", required: true})
  @IsNotEmpty()
  @IsString()
  readonly post_type: string;

  @ApiProperty({example: 10, description: "Количество постов", required: true})
  @IsNotEmpty()
  @IsNumber()
  readonly number_posts: number;

  @ApiProperty({example: 1, description: "Страница", required: true, default: 0})
  @IsNumber()
  readonly paged: number;

  @ApiProperty({example: "post_id", description: "Сотрировка по", required: false, default: "post_id", enum: OrderBy})
  @IsEnum(OrderBy)
  readonly orderBy?: OrderBy;

  @ApiProperty({example: "ASC", description: "Сортировка", required: false, default: "ASC", enum: Order})
  @IsEnum(Order)
  readonly order?: Order;
}