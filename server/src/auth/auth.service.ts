import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {UserModel} from "../users/user.model";
import {Response} from 'express';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async signIn(user: CreateUserDto, response: Response) {
    try {
      const userData = await this.validateUser(user);
      const token = await this.generateToken(userData);
      response.cookie("jwtToken", token, {httpOnly: true, domain: process.env.CLIENT_URL});
      return {token};
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(user: CreateUserDto, response: Response) {
    try {
      const candidate = await this.userService.getUserByEmail(user.email);
      if (candidate) {
        throw new HttpException(`Пользователь с такой почтой ${user.email} уже существует`, HttpStatus.BAD_REQUEST);
      }
      const hashPassword = await bcrypt.hash(user.password, 5);
      const userData = await this.userService.createUser({...user, password: hashPassword});
      const token = await this.generateToken(userData);
      response.cookie("jwtToken", token, {httpOnly: true, domain: process.env.CLIENT_URL});
      return {token};
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async refreshSession(jwtToken: string, response: Response) {
    if (!jwtToken) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const user = await this.validateToken(jwtToken);

    if (!user) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const token = await this.generateToken(user);
    response.cookie("jwtToken", token, {httpOnly: true, domain: process.env.CLIENT_URL});
    return {token};
  }

  async signout(response: Response) {
    try {
      response.clearCookie("jwtToken");
      return {
        message: "Выход выполнен",
        status: HttpStatus.OK
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(user: UserModel) {
    const payload = {user_id: user.user_id, email: user.email, roles: user.roles};
    return await this.jwtService.signAsync(payload);
  }

  private async validateToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);

    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    const passIsCorrect = await bcrypt.compare(userDto.password, user.password);
    if (user && passIsCorrect) {
      return user;
    }

    throw new UnauthorizedException({message: "Неверный email или password"});
  }
}
