import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import {UserModel} from "./users/user.model";
import {RolesModel} from "./roles/roles.model";
import {UserRolesModel} from "./roles/user-roles.model";
import {AuthModule} from './auth/auth.module';
import {PostModule} from './post/post.module';
import {PostModel} from "./post/post.model";
import {StatusModule} from './status/status.module';
import {StatusModel} from "./status/status.model";
import {PostStatusModel} from "./post/post-status.model";
import {UploadsModule} from './uploads/uploads.module';
import {UploadModel} from "./uploads/upload.model";
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";
import {SizeModule} from './size/size.module';
import {TypeModule} from './type/type.module';
import {TypeModel} from "./type/type.model";
import {UploadsTypesModel} from "./uploads/uploads-types.model";
import {SizeModel} from "./size/size.model";
import {PageModule} from './page/page.module';
import {PostPageModel} from "./post/post-page.model";
import {PageModel} from "./page/page.model";
import {PageStatusModel} from "./page/page-status.model";

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
        UserModel, RolesModel, UserRolesModel, PostModel, StatusModel, PostStatusModel, UploadModel, TypeModel, UploadsTypesModel, SizeModel, PageModel, PostPageModel,
        PageStatusModel
      ],
      synchronize: true,
      sync: {alter: false, force: false},
      autoLoadModels: true,
    }),
    // MongooseModule.forRoot(process.env.DB_MONGO),
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
    PageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
