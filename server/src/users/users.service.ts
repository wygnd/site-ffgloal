import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {RolesModel} from "../roles/roles.model";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "./interface/user.interface";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private rolesServices: RolesService,
    private jwtService: JwtService) {
  }

  async createUser(new_user: CreateUserDto) {
    try {
      const candidate = await this.userRepository.findOne({where: {email: new_user.email}});
      if (candidate) {
        throw new HttpException(`Пользователь с такой почтой (${new_user.email}) уже существует`, HttpStatus.CONFLICT);
      }

      const user = await this.userRepository.create(new_user);
      const userRole = await this.rolesServices.getRoleByValue("ADMIN");
      await user.$set("roles", [userRole.role_id]);
      user.roles = [userRole];
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllUsers() {
    return this.userRepository.findAll({include: [RolesModel]});
  }

  async getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email
      },
      include: [RolesModel]
    })
  }

  getUserByToken(token: string): IUser {
    try {
      const token_name = token.split(' ')[0];
      const token_value = token.split(' ')[1];

      if (token_name !== "Bearer" || !token_value) {
        throw new HttpException("", HttpStatus.FORBIDDEN);
      }

      return this.jwtService.verify(token_value);
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }

  async getUserById(user_id: number) {
    const user = await this.userRepository.findByPk(user_id);
    if (!user) {
      throw new HttpException('Пользователя не существует', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
