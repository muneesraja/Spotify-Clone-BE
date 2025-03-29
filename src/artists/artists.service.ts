import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Song } from 'src/songs/entities/song.entity';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  @ApiOperation({ summary: 'Create an artist' })
  @ApiResponse({ status: 201, description: 'The artist has been successfully created.', type: Artist })
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const artist = this.artistsRepository.create(createArtistDto);
    return this.artistsRepository.save(artist);
  }

  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Return all artists.', type: [Artist] })
  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find({
      relations: ['albums', 'albums.songs'],
      order: {
        isFeatured: 'DESC',
      },
    });
  }

  @ApiOperation({ summary: 'Get all featured artists' })
  @ApiResponse({ status: 200, description: 'Return all featured artists.', type: [Artist] })
  async findFeatured(): Promise<Artist[]> {
    return this.artistsRepository.find({
      where: { isFeatured: true },
      relations: ['albums'],
      order: {
        isFeatured: 'DESC',
      },
      take: 10,
    });
  }
  
  @ApiOperation({ summary: 'Get all songs for an artist' })
  @ApiResponse({ status: 200, description: 'Return all songs for an artist.', type: [Song] })
  async findOneWithSongs(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: { id },
      relations: ['albums', 'albums.songs']
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }

    return artist;
  }

  @ApiOperation({ summary: 'Get all albums for an artist' })
  @ApiResponse({ status: 200, description: 'Return all albums for an artist.', type: [Album] })
  async findOneWithAlbums(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: { id },
      relations: ['albums']
    });

    if (!artist) {
      throw new NotFoundException(`Artist with ID "${id}" not found`);
    }

    return artist;
  }
} 