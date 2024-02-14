import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateRoleDto {
  @ApiProperty({example: "ADMIN", description: "Значение роли"})
  @IsString()
  @IsNotEmpty()
  readonly value: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: "Администратор", description: "Описание роли"})
  readonly description: string;
}