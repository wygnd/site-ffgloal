import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        forwardRef(() => UsersModule),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET_KEY || "JWT_secret_fewjn@xxv_key",
            signOptions: {
                expiresIn: "24h"
            }
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
