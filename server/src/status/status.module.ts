import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {StatusModel} from "./status.model";
import {PostModel} from "../post/post.model";
import {PostStatusModel} from "../post/post-status.model";

@Module({
  imports: [
    SequelizeModule.forFeature([PostModel, StatusModel, PostStatusModel])
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
