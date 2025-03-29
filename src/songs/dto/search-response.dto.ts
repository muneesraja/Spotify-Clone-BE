import { ApiProperty } from '@nestjs/swagger';
import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Song } from '../entities/song.entity';

export class SearchResponseDto {
  @ApiProperty({ type: [Song], isArray: true })
  songs: Song[];

  @ApiProperty({ type: [Album], isArray: true })
  albums: Album[];

  @ApiProperty({ type: [Artist], isArray: true })
  artists: Artist[];
} 