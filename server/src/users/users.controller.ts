import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UserModel} from "./user.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({summary: "Создание нового пользователя"})
  @ApiResponse({status: 200, type: UserModel})
  @Post('/create')
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: "Получить всех пользователей"})
  @ApiResponse({status: 200, type: [UserModel]})
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers()
  }
}
