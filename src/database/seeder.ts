import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { seedAlbums } from './seeds/album.seed';
import { seedSongs } from './seeds/song.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  
  console.log('Starting database seeding...');
  
  try {
    // Run all seed functions
    await seedAlbums(dataSource);
    await seedSongs(dataSource);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 