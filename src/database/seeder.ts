import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { DataSource } from 'typeorm';
import { seedSongs } from './seeds/song.seed';
import { seedAlbumDatabase } from './seeds/album_db.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);
  
  console.log('Starting database seeding...');
  
  try {
    // First seed from external JS files
    console.log('=== Seeding from external JS files ===');
    await seedAlbumDatabase(dataSource);

    // Then run the built-in seed functions
    console.log('\n=== Seeding from built-in data ===');
    await seedSongs(dataSource);
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 