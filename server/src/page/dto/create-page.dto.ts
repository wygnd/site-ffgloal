import {IsNotEmpty, IsString} from "class-validator";

export class CreatePageDto  {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  readonly slug: string;

  readonly menu_order: number;
}