import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { EntityExceptionFilter } from '../../src/common/filters/entity-not-found.filter';

describe('Songs (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  let testSongId: string;
  const testUser = {
    email: `song-test-${Date.now()}@example.com`,
    username: `songtest-${Date.now()}`,
    password: 'Password123!',
  };

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
    // Register and login to get a JWT token
    await request(app.getHttpServer())
    .post('/auth/register')
    .send(testUser);
    
    const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send({
      email: testUser.email,
      password: testUser.password,
    });

    jwtToken = loginResponse.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });
  
  describe('Song List Feature', () => {
    it('should get all songs', async () => {
      const response = await request(app.getHttpServer())
      .get('/songs')
      .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        const song = response.body[0];
        expect(song).toHaveProperty('id');
        expect(song).toHaveProperty('title');
        expect(song).toHaveProperty('duration');
        expect(song).toHaveProperty('url');
        
        // Save a song ID for later tests
        testSongId = song.id;
      }
    });
    
    it('should get a song by ID', async () => {
      // Skip if no songs in database
      if (!testSongId) {
        console.warn('Skipping song by ID test - no songs in the database');
        return;
      }
      
      const response = await request(app.getHttpServer())
      .get(`/songs/${testSongId}`)
      .expect(200);
      
      expect(response.body).toHaveProperty('id', testSongId);
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('duration');
      expect(response.body).toHaveProperty('url');
    });
    
    it('should return 400 for non-existent song ID', () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      
      return request(app.getHttpServer())
      .get(`/songs/${nonExistentId}`)
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Invalid ID format');
      });
    });
    
    it('should return 400 for invalid song ID format', () => {
      return request(app.getHttpServer())
      .get('/songs/invalid-id')
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('Invalid ID format');
      });
    });
  });
  
  describe('Featured Songs', () => {
    it('should get featured songs', async () => {
      const response = await request(app.getHttpServer())
      .get('/songs/featured')
      .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
      
      if (response.body.length > 0) {
        const song = response.body[0];
        expect(song).toHaveProperty('id');
        expect(song).toHaveProperty('title');
        expect(song).toHaveProperty('isFeatured', true);
      }
    });
  });
  
  describe('Search Feature', () => {
    it('should search songs by query', async () => {
      // Search for a common term that's likely to exist
      const response = await request(app.getHttpServer())
        .get('/songs/search?q=a') // Assuming 'a' might match something
        .expect(200);

      // Expect the response body to be an object with the expected keys
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('songs');
      expect(response.body).toHaveProperty('albums');
      expect(response.body).toHaveProperty('artists');

      // Expect each key to hold an array
      expect(Array.isArray(response.body.songs)).toBe(true);
      expect(Array.isArray(response.body.albums)).toBe(true);
      expect(Array.isArray(response.body.artists)).toBe(true);
    });

    it('should return empty arrays for no matches', async () => {
      const response = await request(app.getHttpServer())
        .get('/songs/search?q=nonexistentsongxyz123')
        .expect(200);

      // Expect the response body to be an object with the expected keys
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('songs');
      expect(response.body).toHaveProperty('albums');
      expect(response.body).toHaveProperty('artists');

      // Expect each key to hold an empty array
      expect(Array.isArray(response.body.songs)).toBe(true);
      expect(response.body.songs.length).toBe(0);
      expect(Array.isArray(response.body.albums)).toBe(true);
      expect(response.body.albums.length).toBe(0);
      expect(Array.isArray(response.body.artists)).toBe(true);
      expect(response.body.artists.length).toBe(0);
    });
  });

  describe('Like/Unlike Feature', () => {
    it('should like a song', async () => {
      // Skip if no songs in database
      if (!testSongId) {
        console.warn('Skipping like song test - no songs in the database');
        return;
      }

      const response = await request(app.getHttpServer())
        .post(`/songs/${testSongId}/like`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('added to your liked songs');
    });

    it('should return success even when liking again', async () => {
      // Skip if no songs in database
      if (!testSongId) {
        console.warn('Skipping like again test - no songs in the database');
        return;
      }

      const response = await request(app.getHttpServer())
        .post(`/songs/${testSongId}/like`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('already in your liked songs');
    });

    it('should get user\'s liked songs', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/me/liked-songs')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      
      if (testSongId && response.body.length > 0) {
        const likedSongIds = response.body.map(song => song.id);
        expect(likedSongIds).toContain(testSongId);
      }
    });

    it('should unlike a song', async () => {
      // Skip if no songs in database
      if (!testSongId) {
        console.warn('Skipping unlike song test - no songs in the database');
        return;
      }

      const response = await request(app.getHttpServer())
        .delete(`/songs/${testSongId}/like`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('removed from your liked songs');
    });

    it('should return success even when unliking already unliked song', async () => {
      // Skip if no songs in database
      if (!testSongId) {
        console.warn('Skipping unlike again test - no songs in the database');
        return;
      }

      const response = await request(app.getHttpServer())
        .delete(`/songs/${testSongId}/like`)
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('not in your liked songs');
    });
  });
}); 