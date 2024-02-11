import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }

    async createUser(new_user: CreateUserDto) {
        const candidate = await this.userRepository.findOne({where: {email: new_user.email}});
        if(candidate) {
            throw new HttpException(`Пользователь с такой почтой () уже существует`, HttpStatus.CONFLICT);
        }
    }
}
