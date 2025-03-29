import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: 'The unique identifier of the user', example: '123e4567-e89b-12d3-a456-426614174000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The email address of the user', example: 'user@example.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'The username of the user', example: 'johndoe' })
  @Column()
  username: string;

  @ApiProperty({ description: 'The hashed password of the user' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Whether the user account is active', default: true })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({ description: 'When the user account was created' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'When the user account was last updated' })
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
} 