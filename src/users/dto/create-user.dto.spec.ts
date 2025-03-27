import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should validate a correct user DTO', async () => {
    const dto = new CreateUserDto();
    dto.email = 'valid@example.com';
    dto.username = 'validuser';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail on invalid email', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    dto.username = 'validuser';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('email');
  });

  it('should fail on short password', async () => {
    const dto = new CreateUserDto();
    dto.email = 'valid@example.com';
    dto.username = 'validuser';
    dto.password = 'short';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('password');
  });
}); 