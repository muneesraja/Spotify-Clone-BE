import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Album } from './entities/album.entity';
import { ParseUUIDPipe } from '../common/pipes/parse-uuid.pipe';
import { Song } from 'src/songs/entities/song.entity';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new album' })
  @ApiResponse({ status: 201, description: 'The album has been successfully created.', type: Album })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, description: 'Return all albums.', type: [Album] })
  findAll() {
    return this.albumsService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured albums' })
  @ApiResponse({ status: 200, description: 'Return featured albums.', type: [Album] })
  findFeatured() {
    return this.albumsService.findFeatured();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an album by id' })
  @ApiResponse({ status: 200, description: 'Return the album.', type: Album })
  @ApiResponse({ status: 400, description: 'Invalid UUID format.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.findOne(id);
  }
} 

