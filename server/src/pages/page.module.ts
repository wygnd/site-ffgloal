import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {PageModel} from "./page.model";
import {PostPageModel} from "../posts/post-page.model";
import {StatusModule} from "../status/status.module";
import {StatusModel} from "../status/status.model";
import {PageStatusModel} from "./page-status.model";

@Module({
  imports: [
    SequelizeModule.forFeature([PageModel, PostPageModel, StatusModel, PageStatusModel]),
    StatusModule
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
