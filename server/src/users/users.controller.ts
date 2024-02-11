import {Body, Controller, Post} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation} from "@nestjs/swagger";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Создание нового пользователя"})
  @Post('/create')
  createUser(@Body() user: CreateUserDto) {

  }
}
