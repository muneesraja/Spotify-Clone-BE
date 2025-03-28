import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SongsService } from '../songs/songs.service';

@Controller('users/me/liked-songs')
@UseGuards(JwtAuthGuard)
export class LikedSongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  getLikedSongs(@Request() req) {
    return this.songsService.getUserLikedSongs(req.user.userId);
  }
} 