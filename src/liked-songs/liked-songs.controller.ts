import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SongsService } from '../songs/songs.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Song } from '../songs/entities/song.entity';

@ApiTags('Liked Songs')
@Controller('users/me/liked-songs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class LikedSongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user\'s liked songs' })
  @ApiResponse({ status: 200, description: 'Return the list of liked songs.', type: [Song] })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getLikedSongs(@Request() req) {
    console.log('req.user', req.user);
    return this.songsService.getUserLikedSongs(req.user.userId);
  }
} 