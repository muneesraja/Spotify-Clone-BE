import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { EntityExceptionFilter } from '../../src/common/filters/entity-not-found.filter';

describe('Artists (e2e)', () => {
  let app: INestApplication;

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

  // Since we don't have explicit artist endpoints yet in the API,
  // we'll test for artists through the albums endpoint
  describe('Artist List Feature', () => {
    it('should get artists through album listing', async () => {
      const response = await request(app.getHttpServer())
        .get('/albums')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        // Check that each album has an artist associated with it
        for (const album of response.body) {
          expect(album).toHaveProperty('artist');
          expect(album.artist).toHaveProperty('id');
          expect(album.artist).toHaveProperty('name');
          expect(album.artist).toHaveProperty('imageUrl');
        }
        
        // Check that we have at least one artist
        const uniqueArtistIds = new Set(response.body.map(album => album.artist.id));
        expect(uniqueArtistIds.size).toBeGreaterThan(0);
      }
    });
  });
}); 