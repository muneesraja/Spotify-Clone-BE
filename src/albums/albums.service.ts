import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumsRepository.create(createAlbumDto);
    return this.albumsRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({
      relations: ['artist'],
      order: {
        isFeatured: 'DESC',
      },
    });
  }

  async findFeatured(): Promise<Album[]> {
    return this.albumsRepository.find({
      where: { isFeatured: true },
      relations: ['artist'],  
      order: {
        isFeatured: 'DESC',
      },
      take: 10,
    });
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['artist', 'songs'],
    });

    if (!album) {
      throw new NotFoundException(`Album with ID "${id}" not found`);
    }

    return album;
  }
} 