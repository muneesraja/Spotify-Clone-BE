import { validate } from 'class-validator';
import { CreateArtistDto } from '../create-artist.dto';

describe('CreateArtistDto', () => {
  it('should validate with correct data', async () => {
    const dto = new CreateArtistDto();
    dto.name = 'Test Artist';
    dto.imageUrl = 'https://example.com/image.jpg';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate with optional description', async () => {
    const dto = new CreateArtistDto();
    dto.name = 'Test Artist';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.description = 'This is a test artist description';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with empty name', async () => {
    const dto = new CreateArtistDto();
    dto.name = '';
    dto.imageUrl = 'https://example.com/image.jpg';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with missing name', async () => {
    const dto = new CreateArtistDto();
    dto.imageUrl = 'https://example.com/image.jpg';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('name');
  });

  it('should fail with empty imageUrl', async () => {
    const dto = new CreateArtistDto();
    dto.name = 'Test Artist';
    dto.imageUrl = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('imageUrl');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with missing imageUrl', async () => {
    const dto = new CreateArtistDto() as any;
    dto.name = 'Test Artist';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('imageUrl');
  });

  it('should fail with non-string values', async () => {
    const dto = new CreateArtistDto() as any;
    dto.name = 123;
    dto.imageUrl = 456;
    dto.description = 789;

    const errors = await validate(dto);
    expect(errors.length).toBe(3);
    expect(errors.some(error => error.property === 'name' && error.constraints?.isString)).toBeTruthy();
    expect(errors.some(error => error.property === 'imageUrl' && error.constraints?.isString)).toBeTruthy();
    expect(errors.some(error => error.property === 'description' && error.constraints?.isString)).toBeTruthy();
  });
});