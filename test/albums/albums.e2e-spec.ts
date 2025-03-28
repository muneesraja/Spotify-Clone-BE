import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { EntityExceptionFilter } from '../../src/common/filters/entity-not-found.filter';

describe('Albums (e2e)', () => {
  let app: INestApplication;
  let testAlbumId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.useGlobalFilters(new EntityExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Album List Feature', () => {
    it('should get all albums', async () => {
      const response = await request(app.getHttpServer())
        .get('/albums')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        const album = response.body[0];
        expect(album).toHaveProperty('id');
        expect(album).toHaveProperty('title');
        expect(album).toHaveProperty('imageUrl');
        expect(album).toHaveProperty('releaseDate');
        expect(album).toHaveProperty('artistId');
        expect(album).toHaveProperty('artist');
        expect(album.artist).toHaveProperty('name');
        
        // Save an album ID for later tests
        testAlbumId = album.id;
      }
    });

    it('should get an album by ID with its songs', async () => {
      // Skip if no albums in database
      if (!testAlbumId) {
        console.warn('Skipping album by ID test - no albums in the database');
        return;
      }

      const response = await request(app.getHttpServer())
        .get(`/albums/${testAlbumId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', testAlbumId);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('imageUrl');
      expect(response.body).toHaveProperty('releaseDate');
      expect(response.body).toHaveProperty('artistId');
      expect(response.body).toHaveProperty('artist');
      expect(response.body.artist).toHaveProperty('name');
      expect(response.body).toHaveProperty('songs');
      expect(Array.isArray(response.body.songs)).toBe(true);
    });

    it('should return 404 for non-existent album ID', () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      
      return request(app.getHttpServer())
        .get(`/albums/${nonExistentId}`)
        .expect(404)
        .expect((res) => {
          expect(res.body.message).toContain('not found');
        });
    });

    it('should return 400 for invalid album ID format', () => {
      return request(app.getHttpServer())
        .get('/albums/invalid-id')
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toContain('Invalid ID format');
        });
    });
  });
}); 