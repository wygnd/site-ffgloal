import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import {ValidationPipe} from "@nestjs/common";
import * as basicAuth from 'express-basic-auth'

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_2],
    optionsSuccessStatus: 200
  });
  const config = new DocumentBuilder()
    .setTitle("API FFGlobal")
    .setDescription("Документация по API Backend сайта FFglobal")
    .setVersion("1.0.0")
    .addServer("https://ffglobal.ru/7000/api", "Main server side")
    .build();
  app.use(
    ['/api/docs', '/api/docs-json'],
    basicAuth({
      challenge: true,
      // this is the username and password used to authenticate
      users: {[process.env.SWAGGER_API_USERNAME]: process.env.SWAGGER_API_PASSWORD},
    }),
  );
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  app.setGlobalPrefix("/api");
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on PORT = ${PORT}`)
  });
}

bootstrap();
