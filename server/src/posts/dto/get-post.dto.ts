import {IsEnum, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {DefaultValuePipe} from "@nestjs/common";

export class GetPostDto {

  @IsNotEmpty()
  @IsString()
  readonly post_type: string;

  @IsNotEmpty()
  @IsNumber()
  readonly number_posts: number = -1;

  @IsNumber()
  readonly offset: number = 0;

  @IsEnum({
    id: "id",
    title: "title",
    menu_order: "menu_order"
  })
  readonly orderby?: "id" | "title" | "menu_order" = "id";

  @IsEnum({
    asc: "ASC",
    desc: "DESC"
  })
  readonly order?: "ASC" | "DESC" = "ASC";
}