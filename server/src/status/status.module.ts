import { Module } from '@nestjs/common';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {StatusModel} from "./status.model";
import {PostModel} from "../posts/post.model";
import {PostStatusModel} from "../posts/post-status.model";
import {PageStatusModel} from "../pages/page-status.model";

@Module({
  imports: [
    SequelizeModule.forFeature([PostModel, StatusModel, PostStatusModel, PageStatusModel])
  ],
  controllers: [StatusController],
  providers: [StatusService],
  exports: [StatusService],
})
export class StatusModule {}
