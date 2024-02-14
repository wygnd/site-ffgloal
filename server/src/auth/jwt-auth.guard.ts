import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const req = context.switchToHttp().getRequest();
            const authHeader = req.headers.authorization;
            const token_type = authHeader.split(' ')[0];
            const token_value = authHeader.split(' ')[1];
            if (token_type !== "Bearer" || !token_value) {
                throw new UnauthorizedException({message: "Пользователь не авторизован"})
            }
            req.user = this.jwtService.verify(token_value);
            return true;
        } catch (e) {
            throw new UnauthorizedException({message: "Пользователь не авторизован"})
        }
    }
}