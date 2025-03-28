import { validate } from 'class-validator';
import { CreateUserDto } from '../create-user.dto';

describe('CreateUserDto', () => {
  it('should validate with correct data', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.username = 'testuser';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with invalid email', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    dto.username = 'testuser';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints).toHaveProperty('isEmail');
  });

  it('should fail with empty email', async () => {
    const dto = new CreateUserDto();
    dto.email = '';
    dto.username = 'testuser';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with short username', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.username = 'te';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('username');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail with empty username', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.username = '';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('username');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with short password', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.username = 'testuser';
    dto.password = '12345';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should fail with empty password', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@example.com';
    dto.username = 'testuser';
    dto.password = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });
}); 