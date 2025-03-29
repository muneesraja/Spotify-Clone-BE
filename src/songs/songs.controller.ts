import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseUUIDPipe } from '../common/pipes/parse-uuid.pipe';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Song } from './entities/song.entity';
import { SearchResponseDto } from './dto/search-response.dto';

@ApiTags('Songs')
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new song' })
  @ApiResponse({ status: 201, description: 'The song has been successfully created.', type: Song })
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all songs' })
  @ApiResponse({ status: 200, description: 'Return all songs.', type: [Song] })
  findAll() {
    return this.songsService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured songs' })
  @ApiResponse({ status: 200, description: 'Return featured songs.', type: [Song] })
  findFeatured() {
    return this.songsService.findFeatured();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search across songs, albums, and artists' })
  @ApiResponse({ status: 200, description: 'Return matching songs, albums, and artists.', type: SearchResponseDto })
  search(@Query('q') query: string): Promise<SearchResponseDto> {
    return this.songsService.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a song by id' })
  @ApiResponse({ status: 200, description: 'Return the song.', type: Song })
  @ApiResponse({ status: 404, description: 'Song not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.songsService.findOne(id);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Like a song' })
  @ApiResponse({ status: 200, description: 'The song has been liked.', schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' }
    }
  }})
  likeSong(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.songsService.likeSong(req.user.userId, id);
  }

  @Delete(':id/like')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unlike a song' })
  @ApiResponse({ status: 200, description: 'The song has been unliked.', schema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' }
    }
  }})
  unlikeSong(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.songsService.unlikeSong(req.user.userId, id);
  }
}
