import { validate } from 'class-validator';
import { CreateAlbumDto } from '../create-album.dto';

describe('CreateAlbumDto', () => {
  it('should validate with correct data', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = '2023-01-01';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with empty title', async () => {
    const dto = new CreateAlbumDto();
    dto.title = '';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = '2023-01-01';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with missing title', async () => {
    const dto = new CreateAlbumDto();
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = '2023-01-01';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');
  });

  it('should fail with empty imageUrl', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = '';
    dto.releaseDate = '2023-01-01';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('imageUrl');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with missing imageUrl', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.releaseDate = '2023-01-01';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('imageUrl');
  });

  it('should fail with invalid release date', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = 'not-a-date';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('releaseDate');
    expect(errors[0].constraints).toHaveProperty('isDateString');
  });

  it('should fail with missing release date', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.artistId = '00000000-0000-0000-0000-000000000000';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('releaseDate');
  });

  it('should fail with invalid artist ID', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = '2023-01-01';
    dto.artistId = 'not-a-uuid';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('artistId');
    expect(errors[0].constraints).toHaveProperty('isUuid');
  });

  it('should fail with empty artist ID', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = '2023-01-01';
    dto.artistId = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('artistId');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with missing artist ID', async () => {
    const dto = new CreateAlbumDto();
    dto.title = 'Test Album';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('artistId');
  });
}); 