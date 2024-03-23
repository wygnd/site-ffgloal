import {Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserModel} from "../users/user.model";
import {Request, Response} from 'express';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @ApiOperation({summary: "Авторизация пользователя"})
  @ApiResponse({status: 200, type: UserModel})
  @Post('/signin')
  async signIn(@Res({passthrough: true}) response: Response, @Body() user: CreateUserDto) {
    return this.authService.signIn(user, response);
  }

  @ApiOperation({summary: "Выход"})
  @Post('/signout')
  async signOut(@Req() request: Request, @Res({passthrough: true}) response: Response) {
    return this.authService.signout(response);
  }

  @ApiOperation({summary: "Обновление сессии"})
  @Get('/refresh')
  async refreshSession(@Req() request: Request, @Res() response: Response) {
    const {jwtToken} = request.cookies;

    return this.authService.refreshSession(jwtToken, response);
  }

  @ApiOperation({summary: "Регистрация пользователя", deprecated: true})
  @ApiResponse({status: 200, type: UserModel})
  @Post('/signup')
  async singUp() {
    return new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
