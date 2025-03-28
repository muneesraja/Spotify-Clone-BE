import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { EntityExceptionFilter } from '../../src/common/filters/entity-not-found.filter';

describe('Authentication (e2e)', () => {
  let app: INestApplication;
  let jwtToken: string;
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    username: `testuser-${Date.now()}`,
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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('User Registration', () => {
    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe(testUser.email);
          expect(res.body.username).toBe(testUser.username);
          expect(res.body).not.toHaveProperty('password');
          expect(res.body.isActive).toBe(true);
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
        });
    });

    it('should not register a user with existing email', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(testUser)
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('already exists');
        });
    });

    it('should validate user input', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'not-an-email',
          username: 'u',
          password: 'short',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBeInstanceOf(Array);
          expect(res.body.message.length).toBeGreaterThan(0);
        });
    });
  });

  describe('User Login', () => {
    it('should log in a user with valid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('access_token');
          expect(res.body.user).toHaveProperty('id');
          expect(res.body.user.email).toBe(testUser.email);
          expect(res.body.user.username).toBe(testUser.username);
          expect(res.body.user).not.toHaveProperty('password');
          
          // Save the token for future tests
          jwtToken = res.body.access_token;
        });
    });

    it('should not log in a user with invalid credentials', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: testUser.email,
          password: 'wrong-password',
        })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).toBe('Invalid credentials');
        });
    });

    it('should validate login input', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'not-an-email',
          password: '',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).toBeInstanceOf(Array);
          expect(res.body.message.length).toBeGreaterThan(0);
        });
    });
  });

  describe('Token Verification', () => {
    it('should access protected route with valid token', () => {
      expect(jwtToken).toBeDefined();
      
      return request(app.getHttpServer())
        .get('/users/me/liked-songs')
        .set('Authorization', `Bearer ${jwtToken}`)
        .expect(200);
    });

    it('should not access protected route without token', () => {
      return request(app.getHttpServer())
        .get('/users/me/liked-songs')
        .expect(401);
    });

    it('should not access protected route with invalid token', () => {
      return request(app.getHttpServer())
        .get('/users/me/liked-songs')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });
}); 