/**
 * @file        src/auth/auth.service.spec.ts
 * @description Unit tests for Auth service focusing on security concerns
 * @module      AuthModule
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

describe('AuthService (Security Tests)', () => {
  let service: AuthService;
  let prismaService: any;
  let jwtService: any;

  beforeEach(async () => {
    // Mock Prisma Service
    prismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
      nKTProfile: { create: jest.fn() },
      employer: { create: jest.fn() },
      session: { create: jest.fn() },
      $transaction: jest.fn((callback) => callback(prismaService)),
    };

    jwtService = {
      sign: jest.fn(() => 'mockToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Security: register()', () => {
    it('should throw ConflictException if email already exists', async () => {
      // Arrange
      prismaService.user.findUnique.mockResolvedValue({ id: 'existing' });

      // Act & Assert
      await expect(
        service.register({
          email: 'test@example.com',
          password: 'StrongPassword123!',
          role: Role.NKT,
        })
      ).rejects.toThrow(ConflictException);
    });

    it('should hash the password before saving', async () => {
      // Arrange
      prismaService.user.findUnique.mockResolvedValue(null);
      prismaService.user.create.mockImplementation(async ({ data }) => {
        // Assert inside the mock
        expect(data.passwordHash).not.toBe('StrongPassword123!');
        expect(data.passwordHash.length).toBeGreaterThan(50); // Typical bcrypt hash length
        return { id: '123', email: data.email, role: data.role };
      });
      
      // Act
      await service.register({
        email: 'test@example.com',
        password: 'StrongPassword123!',
        role: Role.NKT,
      });

      // Assert
      expect(prismaService.user.create).toHaveBeenCalled();
    });
  });

  describe('Security: login()', () => {
    it('should throw generic UnauthorizedException if email not found (Prevent Enumeration)', async () => {
      // Arrange
      prismaService.user.findUnique.mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.login({
          email: 'notfound@example.com',
          password: 'Password123!',
        })
      ).rejects.toThrow(new UnauthorizedException('Email hoặc mật khẩu không đúng'));
    });

    it('should throw generic UnauthorizedException if password is wrong (Prevent Brute Force Analysis)', async () => {
      // Arrange
      // Create a real hash so bcrypt.compare works properly
      const realHash = await bcrypt.hash('CorrectPassword123!', 10);
      prismaService.user.findUnique.mockResolvedValue({
        id: '123',
        email: 'user@example.com',
        passwordHash: realHash,
        isActive: true,
      });

      // Act & Assert
      await expect(
        service.login({
          email: 'user@example.com',
          password: 'WrongPassword!',
        })
      ).rejects.toThrow(new UnauthorizedException('Email hoặc mật khẩu không đúng'));
    });
  });
});
