import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { LikedSong } from '../liked-songs/entities/liked-song.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(LikedSong)
    private likedSongsRepository: Repository<LikedSong>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songsRepository.find({
      relations: ['artist', 'album'],
    });
  }

  async findOne(id: string): Promise<Song> {
    const song = await this.songsRepository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });

    if (!song) {
      throw new NotFoundException(`Song with ID "${id}" not found`);
    }

    return song;
  }

  async findFeatured(): Promise<Song[]> {
    return this.songsRepository.find({
      where: { isFeatured: true },
      relations: ['artist', 'album'],
    });
  }

  async search(query: string): Promise<Song[]> {
    return this.songsRepository
      .createQueryBuilder('song')
      .leftJoinAndSelect('song.artist', 'artist')
      .leftJoinAndSelect('song.album', 'album')
      .where('LOWER(song.title) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(artist.name) LIKE LOWER(:query)', { query: `%${query}%` })
      .orWhere('LOWER(album.title) LIKE LOWER(:query)', { query: `%${query}%` })
      .getMany();
  }

  async likeSong(userId: string, songId: string): Promise<{ success: boolean; message: string }> {
    // First, check if the song exists
    const song = await this.findOne(songId);

    // Check if song is already liked
    const existingLike = await this.likedSongsRepository.findOne({
      where: { userId, songId },
    });

    if (existingLike) {
      return { 
        success: true, 
        message: `Song "${song.title}" is already in your liked songs` 
      };
    }

    // Create a new like
    const likedSong = this.likedSongsRepository.create({
      userId,
      songId,
    });
    await this.likedSongsRepository.save(likedSong);
    
    return { 
      success: true, 
      message: `Song "${song.title}" added to your liked songs` 
    };
  }

  async unlikeSong(userId: string, songId: string): Promise<{ success: boolean; message: string }> {
    // First, check if the song exists
    const song = await this.findOne(songId);

    // Check if song is liked
    const existingLike = await this.likedSongsRepository.findOne({
      where: { userId, songId },
    });

    if (!existingLike) {
      return { 
        success: true, 
        message: `Song "${song.title}" is not in your liked songs` 
      };
    }

    // Delete the like
    await this.likedSongsRepository.delete({ userId, songId });
    
    return { 
      success: true, 
      message: `Song "${song.title}" removed from your liked songs` 
    };
  }

  async getUserLikedSongs(userId: string): Promise<Song[]> {
    const likedSongs = await this.likedSongsRepository.find({
      where: { userId },
      relations: ['song', 'song.artist', 'song.album'],
    });

    return likedSongs.map(like => like.song);
  }

  async isLikedByUser(userId: string, songId: string): Promise<boolean> {
    const like = await this.likedSongsRepository.findOne({
      where: { userId, songId },
    });

    return !!like;
  }
} 