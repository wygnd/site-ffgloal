import {Module} from '@nestjs/common';
import {PostService} from './post.service';
import {PostController} from './post.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {PostModel} from "./post.model";
import {PostStatusModel} from "./post-status.model";
import {StatusModel} from "../status/status.model";
import {StatusModule} from "../status/status.module";
import {UsersModule} from "../users/users.module";
import {PageModel} from "../pages/page.model";
import {PostPageModel} from "./post-page.model";

@Module({
  imports: [
    SequelizeModule.forFeature([PostModel, StatusModel, PostStatusModel, PageModel, PostPageModel]),
    StatusModule,
    UsersModule
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {
}
