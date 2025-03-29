import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { ParseUUIDPipe } from '../common/pipes/parse-uuid.pipe';
import { Song } from 'src/songs/entities/song.entity';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiResponse({ status: 201, description: 'The artist has been successfully created.', type: Artist })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({ status: 200, description: 'Return all artists.', type: [Artist] })
  findAll() {
    return this.artistsService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured artists' })
  @ApiResponse({ status: 200, description: 'Return featured artists.', type: [Artist] })
  findFeatured() {
    return this.artistsService.findFeatured();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an artist by id' })
  @ApiResponse({ status: 200, description: 'Return the artist.', type: Artist })
  @ApiResponse({ status: 404, description: 'Artist not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOneWithAlbums(id);
  }

  @Get(':id/songs')
  @ApiOperation({ summary: 'Get all songs for an artist' })
  @ApiResponse({ status: 200, description: 'Return all songs for an artist.', type: [Song] })
  findSongs(@Param('id', ParseUUIDPipe) id: string) {
    return this.artistsService.findOneWithSongs(id);
  }
} 