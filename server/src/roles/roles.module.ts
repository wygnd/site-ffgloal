import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../users/user.model";
import {RolesModel} from "./roles.model";
import {UserRolesModel} from "./user-roles.model";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, RolesModel, UserRolesModel]), JwtModule
  ],
  controllers: [RolesController],
  providers: [RolesService],
  exports: [RolesService]
})
export class RolesModule {}
