import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ChangePageStatusDto {
  @IsNotEmpty()
  @IsNumber()
  readonly page_id: number;

  @IsNotEmpty()
  @IsString()
  readonly status: string;
}