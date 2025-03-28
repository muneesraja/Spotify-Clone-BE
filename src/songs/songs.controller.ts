import { Controller, Get, Post, Body, Param, Delete, UseGuards, Query, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ParseUUIDPipe } from '../common/pipes/parse-uuid.pipe';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSongDto: CreateSongDto) {
    return this.songsService.create(createSongDto);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }

  @Get('featured')
  findFeatured() {
    return this.songsService.findFeatured();
  }

  @Get('search')
  search(@Query('q') query: string) {
    return this.songsService.search(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.songsService.findOne(id);
  }

  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  likeSong(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.songsService.likeSong(req.user.userId, id);
  }

  @Delete(':id/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  unlikeSong(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    return this.songsService.unlikeSong(req.user.userId, id);
  }
} 