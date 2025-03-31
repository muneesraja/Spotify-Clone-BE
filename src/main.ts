import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityExceptionFilter } from './common/filters/entity-not-found.filter';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Set global prefix
  app.setGlobalPrefix('api');
  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Apply global filters
  app.useGlobalFilters(new EntityExceptionFilter());

  // Parse cookies
  app.use(cookieParser());
  
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001', 'https://spotify.mindlyq.com', 'https://spoty-back-end.mindlyq.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization',
      'Accept',
      'Origin',
      'X-Requested-With',
      'Cookie'
    ],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    sameSite: 'none',
    secure: false,
  });

  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Spotify Clone API')
    .setDescription('API documentation for the Spotify Clone application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Write the Swagger JSON file
  writeFileSync(join(__dirname, '..', 'swagger.json'), JSON.stringify(document, null, 2));
  
  // Setup Swagger UI
  SwaggerModule.setup('api-docs', app, document);
  
  await app.listen(process.env.PORT || 3000, '::');
}
bootstrap();
