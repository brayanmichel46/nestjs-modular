import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions:{
        enableImplicitConversion: true
      }
    }),
  );
  //documentacion
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Platzi store')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  //habilitar los cors
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
