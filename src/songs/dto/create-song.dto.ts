import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSongDto {
  @ApiProperty({ description: 'The title of the song', example: 'Shape of You' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The duration of the song in seconds', example: 216 })
  @IsInt()
  @Min(1)
  duration: number;

  @ApiProperty({ description: 'The URL of the song file', example: 'https://example.com/songs/shape-of-you.mp3' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ description: 'The URL of the song image', example: 'https://example.com/images/shape-of-you.jpg' })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'The ID of the album that the song belongs to', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  albumId: string;

  @ApiProperty({ description: 'The ID of the artist that created the song', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  artistId: string;

  @ApiProperty({ description: 'Whether the song is featured', example: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
  
  @ApiProperty({ description: 'The release date of the song', example: '2023-01-01' })
  @IsDateString()
  releaseDate: string;
} 