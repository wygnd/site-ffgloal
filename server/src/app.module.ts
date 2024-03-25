import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import {UserModel} from "./users/user.model";
import {RolesModel} from "./roles/roles.model";
import {UserRolesModel} from "./roles/user-roles.model";
import {AuthModule} from './auth/auth.module';
import {PostModule} from './posts/post.module';
import {PostModel} from "./posts/post.model";
import {StatusModule} from './status/status.module';
import {StatusModel} from "./status/status.model";
import {PostStatusModel} from "./posts/post-status.model";
import {UploadsModule} from './uploads/uploads.module';
import {UploadModel} from "./uploads/upload.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {SizeModule} from './sizes/size.module';
import {TypeModule} from './types/type.module';
import {TypeModel} from "./types/type.model";
import {SizeModel} from "./sizes/size.model";
import {PageModule} from './pages/page.module';
import {PostPageModel} from "./posts/post-page.model";
import {PageModel} from "./pages/page.model";
import {PageStatusModel} from "./pages/page-status.model";
import {SettingModule} from './settings/setting.module';
import {SettingModel} from "./settings/Setting.model";
import {AuthModel} from "./auth/auth-model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST_PG,
      port: +process.env.DB_PORT_PG,
      username: process.env.DB_USERNAME_PG,
      password: process.env.DB_PASSWORD_PG,
      database: process.env.DB_DATABASE_PG,
      models: [
        UserModel, RolesModel, UserRolesModel, PostModel, StatusModel, PostStatusModel, UploadModel, TypeModel, SizeModel, PageModel, PostPageModel,
        PageStatusModel, SettingModel
      ],
      synchronize: true,
      sync: {
        alter: false,
        force: false
      },
      autoLoadModels: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostModule,
    StatusModule,
    UploadsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/static'),
      serveRoot: "/uploads"
    }),
    SizeModule,
    TypeModule,
    PageModule,
    SettingModule,
    AuthModel
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
