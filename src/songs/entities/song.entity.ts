import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artists/entities/artist.entity';
import { Album } from '../../albums/entities/album.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  duration: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  albumId: string;

  @Column()
  artistId: string;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ type: 'date' })
  releaseDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Album, album => album.songs)
  album: Album;

  @ManyToOne(() => Artist)
  artist: Artist;
} 