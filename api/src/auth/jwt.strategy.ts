/**
 * @file        src/auth/jwt.strategy.ts
 * @description JWT Passport Strategy
 * @module      AuthModule
 */

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'super-secret-fallback-key',
    });
  }

  async validate(payload: any) {
    // This payload is returned as req.user in controllers
    return { userId: payload.sub, role: payload.role };
  }
}
