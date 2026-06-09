/**
 * @file        src/categories/categories.service.ts
 * @description Categories Service
 * @module      CategoriesModule
 */

import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  private async checkAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'ADMIN') throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_ADMIN'));
  }

  async findAll() {
    return this.prisma.jobCategory.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(userId: string, dto: CreateCategoryDto) {
    await this.checkAdmin(userId);
    
    // Simplistic check for duplicates
    const existing = await this.prisma.jobCategory.findFirst({ where: { name: dto.name } });
    if (existing) throw new ConflictException(this.i18n.t('messages.category.EXISTS'));

    return this.prisma.jobCategory.create({ data: { name: dto.name } });
  }

  async update(userId: string, id: string, dto: UpdateCategoryDto) {
    await this.checkAdmin(userId);
    
    const existing = await this.prisma.jobCategory.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(this.i18n.t('messages.category.NOT_FOUND'));

    return this.prisma.jobCategory.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.checkAdmin(userId);
    
    const existing = await this.prisma.jobCategory.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(this.i18n.t('messages.category.NOT_FOUND'));

    await this.prisma.jobCategory.delete({ where: { id } });
    return true;
  }
}
