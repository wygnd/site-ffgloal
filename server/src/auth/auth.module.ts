import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {AuthModel} from "./auth-model";

@Module({
  imports: [
    SequelizeModule.forFeature([AuthModel]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [
    AuthModule,
    JwtModule
  ],
})
export class AuthModule {
}
