import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // First, try to get the token from the Authorization header
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        // Then, try to get the token from cookies
        (request: Request) => {
          if (request && request.cookies && request.cookies.token) {
            return request.cookies.token;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, username: payload.username };
  }
} 