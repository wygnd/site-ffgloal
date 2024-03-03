import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UploadModel} from "./upload.model";
import {UsersModule} from "../users/users.module";
import {SharpModule} from "nestjs-sharp";
import {SizeModule} from "../size/size.module";
import {TypeModel} from "../type/type.model";
import {TypeModule} from "../type/type.module";
import {SizeModel} from "../size/size.model";


@Module({
  imports: [
    SequelizeModule.forFeature([UploadModel, TypeModel, SizeModel]),
    UsersModule,
    SharpModule,
    SizeModule,
    TypeModule
  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
