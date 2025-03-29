import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('artists')
export class Artist {
  @ApiProperty({ description: 'The unique identifier of the artist', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the artist', example: 'Ed Sheeran' })
  @Column()
  name: string;

  @ApiProperty({ description: 'The URL of the artist\'s profile image', example: 'https://example.com/images/ed-sheeran.jpg' })
  @Column()
  imageUrl: string;

  @ApiProperty({ description: 'A brief description of the artist', example: 'English singer-songwriter', nullable: true })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'Whether the artist is featured', example: false })
  @Column({ default: false })
  isFeatured: boolean;

  @ApiProperty({ description: 'When the artist was created in the system' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'When the artist was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ApiProperty({ description: 'The albums by this artist', type: () => [Album] })
  @OneToMany(() => Album, album => album.artist)
  albums: Album[];
} 