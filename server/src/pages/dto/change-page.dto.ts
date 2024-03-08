import {IsNotEmpty} from "class-validator";

export class ChangePageDto {
  @IsNotEmpty()
  readonly page_id: number;

  readonly title: string;

  readonly slug: string;

  readonly menu_order: number;
}