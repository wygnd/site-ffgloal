import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: "Денис", description: "Имя пользователя"})
    readonly name: string;

    @ApiProperty({example: "example@gmail.com", description: "Адресс электронной почты"})
    readonly email: string;

    @ApiProperty({example: "password", description: "Пароль пользователя"})
    readonly password: string;
}