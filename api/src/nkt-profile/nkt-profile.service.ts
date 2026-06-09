/**
 * @file        src/nkt-profile/nkt-profile.service.ts
 * @description NKT Profile business logic
 * @module      NktProfileModule
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateNktProfileDto } from './dto/update-nkt-profile.dto';

@Injectable()
export class NktProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.nKTProfile.findUnique({
      where: { userId },
      include: {
        workExperience: true,
        education: true,
      }
    });

    if (!profile) {
      throw new NotFoundException('Không tìm thấy hồ sơ người khuyết tật');
    }

    return profile;
  }

  async updateProfile(userId: string, dto: UpdateNktProfileDto) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Không tìm thấy hồ sơ người khuyết tật');
    }

    // Filter out undefined values
    const data = Object.fromEntries(Object.entries(dto).filter(([_, v]) => v != null));

    // Handle date string to Date object
    if (data.dateOfBirth) {
      data.dateOfBirth = new Date(data.dateOfBirth as string);
    }

    const updated = await this.prisma.nKTProfile.update({
      where: { userId },
      data: data as any,
    });

    // We do NOT directly update tsvector via Prisma normal update, 
    // it requires raw SQL trigger or query for postgres. 
    // Usually, you define a DB trigger to auto-update searchVector when rows change.

    return updated;
  }
}
