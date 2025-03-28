import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Song } from '../../songs/entities/song.entity';

@Entity('user_liked_songs')
export class LikedSong {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  songId: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  likedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Song)
  @JoinColumn({ name: 'songId' })
  song: Song;
} 