import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Setup Basic Auth for Swagger
  const swaggerUsername = process.env.SWAGGER_USERNAME || 'admin';
  const swaggerPassword = process.env.SWAGGER_PASSWORD || 'admin';

  app.use(
    '/api',
    basicAuth({
      challenge: true,
      users: { [swaggerUsername]: swaggerPassword },
    }),
  );

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('A simple Todo application API with CRUD operations')
    .setVersion('1.0')
    .addTag('todos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`Swagger documentation available at: http://localhost:${process.env.PORT ?? 3000}/api`);
  console.log(`Swagger credentials - Username: ${swaggerUsername}, Password: ${swaggerPassword}`);
}
bootstrap();
