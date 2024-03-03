import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcryptjs';
import {UserModel} from "../users/user.model";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async signIn(user: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(user.email);
        if(!candidate) {
         throw new HttpException(`Пользователя не существует`, HttpStatus.NOT_FOUND);
        }
        const userData = await this.validateUser(user);
        return this.generateToken(userData);
    }

    async signUp(user: CreateUserDto) {
            const candidate = await this.userService.getUserByEmail(user.email);
            if (candidate) {
                throw new HttpException(`Пользователь с такой почтой ${user.email} уже существует`, HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcrypt.hash(user.password, 5);
            const userData = await this.userService.createUser({...user, password: hashPassword});
            return this.generateToken(userData);
    }

    private async generateToken(user: UserModel) {
        const payload = {user_id: user.user_id, email: user.email, roles: user.roles};
        return {token: this.jwtService.sign(payload)};
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passIsCorrect = await bcrypt.compare(userDto.password, user.password);
        if(user && passIsCorrect) {
            return user;
        }

        throw new UnauthorizedException({message: "Неверный email или password"});
    }
}
