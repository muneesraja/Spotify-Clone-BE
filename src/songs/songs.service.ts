import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Song } from './entities/song.entity';
import { CreateSongDto } from './dto/create-song.dto';
import { LikedSong } from '../liked-songs/entities/liked-song.entity';
import { Album } from '../albums/entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { SearchResponseDto } from './dto/search-response.dto';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(LikedSong)
    private likedSongsRepository: Repository<LikedSong>,
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return this.songsRepository.save(song);
  }

  // featured should sort by isFeatured true first
  async findAll(): Promise<Song[]> {
    return this.songsRepository.find({
      relations: ['artist', 'album'],
      order: {
        isFeatured: 'DESC',
      },
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
      order: {
        isFeatured: 'DESC',
      },
      take: 10,
    });
  }


  @ApiResponse({ type: SearchResponseDto, isArray: true })
  async search(query: string): Promise<SearchResponseDto> {
    const searchTerm = `%${query}%`;

    const songs = await this.songsRepository.find({
      where: { title: ILike(searchTerm) },
      relations: ['artist', 'album'],
    });

    const albums = await this.albumsRepository.find({
      where: { title: ILike(searchTerm) },
      relations: ['artist'],
    });

    const artists = await this.artistsRepository.find({
      where: { name: ILike(searchTerm) },
    });

    return { songs, albums, artists };
  }

  async likeSong(userId: string, songId: string): Promise<{ success: boolean; message: string }> {
    const song = await this.findOne(songId);
    const existingLike = await this.likedSongsRepository.findOne({
      where: { userId, songId },
    });

    if (existingLike) {
      return { 
        success: true, 
        message: `Song "${song.title}" is already in your liked songs` 
      };
    }

    const likedSong = this.likedSongsRepository.create({ userId, songId });
    await this.likedSongsRepository.save(likedSong);
    
    return { 
      success: true, 
      message: `Song "${song.title}" added to your liked songs` 
    };
  }

  async unlikeSong(userId: string, songId: string): Promise<{ success: boolean; message: string }> {
    const song = await this.findOne(songId);
    const existingLike = await this.likedSongsRepository.findOne({
      where: { userId, songId },
    });

    if (!existingLike) {
      return { 
        success: true, 
        message: `Song "${song.title}" is not in your liked songs` 
      };
    }

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