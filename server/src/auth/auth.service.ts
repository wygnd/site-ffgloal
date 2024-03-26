import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {UserModel} from "../users/user.model";
import {UserResponseDto} from "./dto/user-response.dto";
import {AuthModel} from "./auth-model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthModel) private AuthRepository: typeof AuthModel,
    private userService: UsersService,
    private jwtService: JwtService) {
  }

  async signIn(user: CreateUserDto) {
    try {
      const userData = await this.validateUser(user);
      const {access_token, refresh_token} = await this.generateTokens(userData);
      await this.saveToken(userData.user_id, access_token, refresh_token);
      return {
        user: new UserResponseDto(userData),
        access_token,
        refresh_token
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(user: CreateUserDto) {
    try {
      const candidate = await this.userService.getUserByEmail(user.email);
      if (candidate) {
        throw new HttpException(`Пользователь с такой почтой ${user.email} уже существует`, HttpStatus.BAD_REQUEST);
      }
      const hashPassword = await bcrypt.hash(user.password, 5);
      const userData = await this.userService.createUser({...user, password: hashPassword});
      const {access_token, refresh_token} = await this.generateTokens(userData);
      await this.saveToken(userData.user_id, access_token, refresh_token);
      return {
        user: new UserResponseDto(userData),
        access_token,
        refresh_token
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async refreshSession(refresh_token_client: string) {
    if (!refresh_token_client) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }

    const user = await this.validateRefreshToken(refresh_token_client);
    const tokenFromDatabase = await this.getToken(refresh_token_client);

    if (!user || !tokenFromDatabase) {
      throw new UnauthorizedException("Пользователь не авторизован");
    }
    const userFromDatabase = await this.userService.getUserByEmail(user.email);
    const {access_token, refresh_token} = await this.generateTokens(user);
    await this.saveToken(user.user_id, access_token, refresh_token);
    return {
      user: new UserResponseDto(userFromDatabase),
      access_token,
      refresh_token
    };
  }

  async signout(refresh_token) {
    try {
      await this.removeToken(refresh_token);
      return {
        message: "Выход выполнен",
        status: HttpStatus.OK
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  private async generateTokens(user: UserModel) {
    const payload = {user_id: user.user_id, email: user.email, roles: user.roles};
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY_REFRESH,
      expiresIn: "1h"
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET_KEY_ACCESS,
      expiresIn: "7d"
    })
    return {
      access_token,
      refresh_token
    };
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

  private async removeToken(refresh_token) {
    try {
      return await this.AuthRepository.destroy({where: {refresh_token}});
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  private async saveToken(user_id: number, access_token: string, refresh_token: string) {
    const [tokenData, isCreated] = await this.AuthRepository.findOrCreate({
      where: {user_id: user_id},
      defaults: {
        user_id,
        access_token,
        refresh_token,
      }
    });

    if (!isCreated) {
      tokenData.access_token = access_token;
      tokenData.refresh_token = refresh_token;
      return await tokenData.save();
    }

    const user = await this.userService.getUserById(user_id);

    await tokenData.$set('user_model', user);

    return tokenData;
  }

  private async findToken(refresh_token) {
    return await this.AuthRepository.findOne({where: refresh_token});
  }

  private async validateAccessToken(access_token) {
    try {
      return await this.jwtService.verifyAsync(access_token, {secret: process.env.JWT_SECRET_KEY_ACCESS});
    } catch (e) {
      return null;
    }
  }

  private async validateRefreshToken(refresh_token) {
    try {
      return await this.jwtService.verifyAsync(refresh_token, {secret: process.env.JWT_SECRET_KEY_REFRESH});
    } catch (e) {
      return null;
    }
  }

  private async getToken(refresh_token: string) {
    return await this.AuthRepository.findOne({where: {refresh_token}});
  }
}
