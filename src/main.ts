import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EntityExceptionFilter } from './common/filters/entity-not-found.filter';
import { writeFileSync } from 'fs';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

const logger = new Logger('Spotify Clone Backend');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'], // Enable all log levels
    bufferLogs: true, // Buffer logs until application is ready
  });
  
  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // only if its in development mode
  if (process.env.NODE_ENV === 'development') {
    app.setGlobalPrefix('api');
  }

  // Apply global filters
  app.useGlobalFilters(new EntityExceptionFilter());

  // Parse cookies
  app.use(cookieParser());
  
  app.enableCors({
    origin: [process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://spotify.mindlyq.com'],
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
  
  const port = process.env.PORT || 3000;
  await app.listen(port, '::');
  
  // Flush logs and log startup message
  app.flushLogs();
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Swagger documentation is available at: http://localhost:${port}/api-docs`);
}
bootstrap();
