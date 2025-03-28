import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @IsDateString()
  releaseDate: string;

  @IsUUID()
  @IsNotEmpty()
  artistId: string;
} 