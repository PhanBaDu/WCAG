/**
 * @file        src/auth/auth.service.ts
 * @description Authentication service with business logic and security rules
 * @module      AuthModule
 *
 * @wcag        N/A
 */

import { Injectable, ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Check if email exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException(this.i18n.t('messages.auth.EMAIL_EXISTS'));
    }

    // 2. Hash password with bcrypt (salt rounds = 12 as per rules)
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(dto.password, saltRounds);

    // 3. Create user and profile in transaction
    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: dto.email,
          passwordHash,
          role: dto.role,
          isActive: true,
          isVerified: false,
        },
      });

      if (dto.role === 'NKT') {
        await tx.nKTProfile.create({
          data: {
            userId: newUser.id,
            fullName: dto.fullName || 'Người dùng mới',
          },
        });
      } else if (dto.role === 'NTD') {
        await tx.employer.create({
          data: {
            userId: newUser.id,
            companyName: dto.companyName || 'Công ty mới',
            isVerified: false,
          },
        });
      }

      return newUser;
    });

    // TODO: Send verification email with single-use JWT

    return { id: user.id, email: user.email, role: user.role };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    // Always use generic error for auth failures (Security best practice)
    if (!user) {
      throw new UnauthorizedException(this.i18n.t('messages.auth.INVALID_CREDENTIALS'));
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException(this.i18n.t('messages.auth.INVALID_CREDENTIALS'));
    }

    if (!user.isActive) {
      throw new ForbiddenException(this.i18n.t('messages.auth.ACCOUNT_LOCKED'));
    }

    // if (!user.isVerified) {
    //   throw new ForbiddenException('Vui lòng xác thực email trước');
    // }

    // Generate tokens
    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Store session
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.create({
      data: {
        userId: user.id,
        tokenHash: hashedRefreshToken,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Always return true to prevent enumeration
      return true;
    }
    // TODO: Generate reset token and send via email
    return true;
  }

  async resetPassword(token: string, newPassword: string) {
    // TODO: Validate token, hash newPassword, update DB
    return true;
  }

  async logout(userId: string, refreshToken: string) {
    // Basic logout - we'd normally verify the token hash against the DB and delete the specific session
    // For simplicity, we just clear user sessions here (logout all for now)
    await this.prisma.session.deleteMany({
      where: { userId },
    });
    return true;
  }
}
