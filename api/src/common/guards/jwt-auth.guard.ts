/**
 * @file        src/common/guards/jwt-auth.guard.ts
 * @description JWT Auth Guard
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
