import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @Min(1)
  duration: number;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsUUID()
  @IsNotEmpty()
  albumId: string;

  @IsUUID()
  @IsNotEmpty()
  artistId: string;

  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @IsDateString()
  releaseDate: string;
} 