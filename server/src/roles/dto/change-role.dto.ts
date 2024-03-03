import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class ChangeRoleDto  {
  @ApiProperty({example: 1, description: "Уникальный идентификатор роли"})
  @IsNotEmpty()
  @IsNumber()
  readonly role_id: number;

  @ApiProperty({example: "ADMIN", description: "Значение роли"})
  @IsNotEmpty()
  @IsString()
  readonly value: string;

  @ApiProperty({example: "Администратор", description: "Описание роли"})
  readonly description: string;
}