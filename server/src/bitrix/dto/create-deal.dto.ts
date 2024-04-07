import {IsNotEmpty, IsPhoneNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateDealDto {

  @ApiProperty({example: "Максим", required: false})
  readonly name: string;

  @ApiProperty({example: "+7 (999) 999-99-99", required: true})
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({example: "12 кг", required: false})
  readonly message: string;

  @ApiProperty({example: "звонок", required: false})
  readonly callback: string
}