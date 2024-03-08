import {ApiProperty} from "@nestjs/swagger";

export class SettingRemoveResponse {
    @ApiProperty({example: "Запись успешно удалена", description: "Описание ответа"})
    readonly message: string;

    @ApiProperty({example: 200, description: "Статус код ответа"})
    readonly statusCode: number;
}