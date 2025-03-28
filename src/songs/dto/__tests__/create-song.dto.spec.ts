import { validate } from 'class-validator';
import { CreateSongDto } from '../create-song.dto';

describe('CreateSongDto', () => {
  it('should validate with correct data', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate with all optional fields', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180;
    dto.url = 'https://example.com/song.mp3';
    dto.imageUrl = 'https://example.com/image.jpg';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.isFeatured = true;
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail with empty title', async () => {
    const dto = new CreateSongDto();
    dto.title = '';
    dto.duration = 180;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('title');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with negative duration', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = -10;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('duration');
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail with zero duration', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 0;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('duration');
    expect(errors[0].constraints).toHaveProperty('min');
  });

  it('should fail with non-integer duration', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180.5 as any;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('duration');
    expect(errors[0].constraints).toHaveProperty('isInt');
  });

  it('should fail with empty URL', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180;
    dto.url = '';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('url');
    expect(errors[0].constraints).toHaveProperty('isNotEmpty');
  });

  it('should fail with invalid album ID', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = 'not-a-uuid';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('albumId');
    expect(errors[0].constraints).toHaveProperty('isUuid');
  });

  it('should fail with invalid artist ID', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = 'not-a-uuid';
    dto.releaseDate = '2023-01-01';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('artistId');
    expect(errors[0].constraints).toHaveProperty('isUuid');
  });

  it('should fail with invalid release date', async () => {
    const dto = new CreateSongDto();
    dto.title = 'Test Song';
    dto.duration = 180;
    dto.url = 'https://example.com/song.mp3';
    dto.albumId = '00000000-0000-0000-0000-000000000000';
    dto.artistId = '00000000-0000-0000-0000-000000000000';
    dto.releaseDate = 'not-a-date';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('releaseDate');
    expect(errors[0].constraints).toHaveProperty('isDateString');
  });
}); 