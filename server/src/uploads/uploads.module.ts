import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {UploadModel} from "./upload.model";
import {UsersModule} from "../users/users.module";


@Module({
  imports: [
    SequelizeModule.forFeature([UploadModel]),
    UsersModule,

  ],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
