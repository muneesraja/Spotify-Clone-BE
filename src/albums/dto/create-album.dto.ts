import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({ description: 'The title of the album', example: 'Divide' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The URL of the album cover image', example: 'https://example.com/images/divide.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: 'The release date of the album', example: '2023-01-01' })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ description: 'The ID of the artist who created this album', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  artistId: string;

  @ApiProperty({ description: 'Whether the album is featured', example: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
} 