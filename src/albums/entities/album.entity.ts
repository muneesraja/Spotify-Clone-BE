import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Song } from '../../songs/entities/song.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('albums')
export class Album {
  @ApiProperty({ description: 'The unique identifier of the album', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The title of the album', example: 'Divide' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The URL of the album cover image', example: 'https://example.com/images/divide.jpg' })
  @Column()
  imageUrl: string;

  @ApiProperty({ description: 'The release date of the album', example: '2023-01-01' })
  @Column({ type: 'date' })
  releaseDate: Date;

  @ApiProperty({ description: 'The ID of the artist who created this album' })
  @Column()
  artistId: string;

  @ApiProperty({ description: 'Whether the album is featured', example: false })
  @Column({ default: false })
  isFeatured: boolean;

  @ApiProperty({ description: 'When the album was created in the system' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'When the album was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ description: 'The artist who created this album', type: () => Artist })
  @ManyToOne(() => Artist, artist => artist.albums)
  artist: Artist;

  @ApiProperty({ description: 'The songs in this album', type: () => [Song] })
  @OneToMany(() => Song, song => song.album)
  songs: Song[];
} 