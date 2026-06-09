/**
 * @file        src/admin/admin.service.ts
 * @description Admin Service
 * @module      AdminModule
 */

import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewJobDto } from './dto/review-job.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  private async checkAdminRole(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_ADMIN'));
    }
  }

  // --- JOBS ---

  async getPendingJobs(userId: string) {
    await this.checkAdminRole(userId);
    return this.prisma.job.findMany({
      where: { status: 'PENDING' },
      include: {
        employer: { select: { companyName: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async reviewJob(userId: string, jobId: string, dto: ReviewJobDto) {
    await this.checkAdminRole(userId);
    
    if (!['ACTIVE', 'REJECTED'].includes(dto.status)) {
      throw new ForbiddenException(this.i18n.t('messages.admin.REVIEW_INVALID_STATUS'));
    }

    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException(this.i18n.t('messages.job.NOT_FOUND'));

    const updated = await this.prisma.job.update({
      where: { id: jobId },
      data: {
        status: dto.status,
        adminNote: dto.adminNote,
        publishedAt: dto.status === 'ACTIVE' ? new Date() : null,
      }
    });

    // TODO: Send notification to Employer
    return updated;
  }

  // --- USERS ---

  async getAllUsers(userId: string) {
    await this.checkAdminRole(userId);
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateUserStatus(adminId: string, targetUserId: string, dto: UpdateUserStatusDto) {
    await this.checkAdminRole(adminId);

    const user = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new NotFoundException(this.i18n.t('messages.admin.USER_NOT_FOUND'));
    if (user.role === 'ADMIN') throw new ForbiddenException(this.i18n.t('messages.admin.CANNOT_LOCK_ADMIN'));

    const updated = await this.prisma.user.update({
      where: { id: targetUserId },
      data: { isActive: dto.isActive }
    });

    // Log the audit action
    await this.prisma.auditLog.create({
      data: {
        userId: adminId,
        action: dto.isActive ? 'ACTIVATE_USER' : 'DEACTIVATE_USER',
        entity: 'User',
        entityId: targetUserId,
        details: { reason: dto.reason },
      }
    });

    return updated;
  }
}
