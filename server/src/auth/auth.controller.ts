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
  async signIn(@Body() user: CreateUserDto, @Res({passthrough: true}) response: Response) {
    const data = await this.authService.signIn(user);
    response.cookie('refreshToken', data.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
    return data;
  }

  @ApiOperation({summary: "Выход"})
  @Post('/signout')
  async signOut(@Req() request: Request, @Res({passthrough: true}) response: Response) {
    const {refreshToken} = request.cookies;
    const data = await this.authService.signout(refreshToken);
    response.clearCookie("refreshToken");
    if (data) {
      return {message: "Выход выполнен"}
    }
    return data;
  }

  @ApiOperation({summary: "Обновление сессии"})
  @Get('/refresh')
  async refreshSession(@Req() request: Request, @Res({passthrough: true}) response: Response) {
    const {refreshToken} = request.cookies;
    const data = await this.authService.refreshSession(refreshToken);
    response.cookie('refreshToken', data.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
    return data;
  }

  @ApiOperation({summary: "Регистрация пользователя", deprecated: true})
  @ApiResponse({status: 200, type: UserModel})
  @Post('/signup')
  async singUp(@Body() dto: CreateUserDto, @Res({passthrough: true}) response: Response) {
    const data = await this.authService.signUp(dto);
    response.cookie('refreshToken', data.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true});
    return data;
    // return new HttpException('Not found', HttpStatus.NOT_FOUND);
  }
}
