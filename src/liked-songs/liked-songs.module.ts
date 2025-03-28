import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikedSongsController } from './liked-songs.controller';
import { LikedSong } from './entities/liked-song.entity';
import { SongsModule } from '../songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikedSong]),
    SongsModule,
  ],
  controllers: [LikedSongsController],
})
export class LikedSongsModule {} 