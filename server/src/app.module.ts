import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import * as process from "process";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST_MYSQL,
      port: +process.env.DB_PORT_MYSQL,
      username: process.env.DB_USERNAME_MYSQL,
      password: process.env.DB_PASSWORD_MYSQL,
      database: process.env.DB_DATABASE_MYSQL,
      models: [],
      synchronize: true,
      autoLoadModels: true,
    }),
    // MongooseModule.forRoot(process.env.DB_MONGO),
    UsersModule,
    RolesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
