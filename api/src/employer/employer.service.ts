/**
 * @file        src/employer/employer.service.ts
 * @description Employer Service
 * @module      EmployerModule
 */

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Injectable()
export class EmployerService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: string) {
    const profile = await this.prisma.employer.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Không tìm thấy hồ sơ nhà tuyển dụng');
    }

    return profile;
  }

  async updateProfile(userId: string, dto: UpdateEmployerDto) {
    const profile = await this.prisma.employer.findUnique({ where: { userId } });
    if (!profile) {
      throw new NotFoundException('Không tìm thấy hồ sơ nhà tuyển dụng');
    }

    const data = Object.fromEntries(Object.entries(dto).filter(([_, v]) => v != null));

    return this.prisma.employer.update({
      where: { userId },
      data: data as any,
    });
  }
}
