import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ description: 'The name of the artist', example: 'Ed Sheeran' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The URL of the artist\'s profile image', example: 'https://example.com/images/ed-sheeran.jpg' })
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: 'A brief description of the artist', example: 'English singer-songwriter', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Whether the artist is featured', default: false, required: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
} 