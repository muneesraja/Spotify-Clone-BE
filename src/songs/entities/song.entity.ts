import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('songs')
export class Song {
  @ApiProperty({ description: 'The unique identifier of the song', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The title of the song', example: 'Shape of You' })
  @Column()
  title: string;

  @ApiProperty({ description: 'The duration of the song in seconds', example: 235 })
  @Column()
  duration: number;

  @ApiProperty({ description: 'The URL where the song file is stored', example: 'https://example.com/songs/shape-of-you.mp3' })
  @Column()
  url: string;

  @ApiProperty({ description: 'The URL of the song\'s cover image', example: 'https://example.com/images/shape-of-you.jpg', nullable: true })
  @Column({ nullable: true })
  imageUrl: string;

  @ApiProperty({ description: 'The ID of the album this song belongs to' })
  @Column()
  albumId: string;

  @ApiProperty({ description: 'The ID of the artist who created this song' })
  @Column()
  artistId: string;

  @ApiProperty({ description: 'Whether the song is featured on the platform', default: false })
  @Column({ default: false })
  isFeatured: boolean;

  @ApiProperty({ description: 'The release date of the song', example: '2023-01-01' })
  @Column({ type: 'date' })
  releaseDate: Date;

  @ApiProperty({ description: 'When the song was created in the system' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'When the song was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ description: 'The album object this song belongs to', type: () => Album })
  @ManyToOne(() => Album, album => album.songs)
  album: Album;

  @ApiProperty({ description: 'The artist object who created this song', type: () => Artist })
  @ManyToOne(() => Artist)
  artist: Artist;
} 