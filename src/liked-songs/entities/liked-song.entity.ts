import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Song } from '../../songs/entities/song.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity('user_liked_songs')
export class LikedSong {
  @ApiProperty({ description: 'The unique identifier of the liked song', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The unique identifier of the user who liked the song', example: '123e4567-e89b-12d3-a456-426614174000' })
  @Column()
  userId: string;

  @ApiProperty({ description: 'The unique identifier of the song that was liked', example: '123e4567-e89b-12d3-a456-426614174000' })
  @Column()
  songId: string;
  
  @ApiProperty({ description: 'The date and time when the song was liked', example: '2023-01-01T00:00:00.000Z' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  likedAt: Date;

  @ApiProperty({ description: 'The user who liked the song', type: () => User })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({ description: 'The song that was liked', type: () => Song })
  @ManyToOne(() => Song)
  @JoinColumn({ name: 'songId' })
  song: Song;
} 