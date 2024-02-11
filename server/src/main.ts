import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle("API FFGlobal")
        .setDescription("Документация по API Backend сайта FFglobal")
        .setVersion("1.0.0")
        .addTag("users")
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api/docs", app, document);
    app.setGlobalPrefix("/api");
    await app.listen(PORT, () => {
        console.log(`Server started on PORT = ${PORT}`)
    });
}

bootstrap();
