/**
 * @file        src/saved-jobs/saved-jobs.service.ts
 * @description Saved Jobs Service
 * @module      SavedJobsModule
 */

import { Injectable, ForbiddenException, ConflictException, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
import { SaveJobDto } from './dto/save-job.dto';

@Injectable()
export class SavedJobsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async saveJob(userId: string, dto: SaveJobDto) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_NKT'));

    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job) throw new NotFoundException(this.i18n.t('messages.job.NOT_FOUND'));

    const existing = await this.prisma.savedJob.findUnique({
      where: {
        jobId_nktProfileId: { jobId: dto.jobId, nktProfileId: profile.id },
      },
    });

    if (existing) {
      throw new ConflictException(this.i18n.t('messages.saved_job.ALREADY_SAVED'));
    }

    return this.prisma.savedJob.create({
      data: {
        jobId: dto.jobId,
        nktProfileId: profile.id,
      },
    });
  }

  async getSavedJobs(userId: string) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_NKT'));

    return this.prisma.savedJob.findMany({
      where: { nktProfileId: profile.id },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            slug: true,
            salaryMin: true,
            salaryMax: true,
            jobType: true,
            province: true,
            employer: { select: { companyName: true, companyLogo: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeSavedJob(userId: string, jobId: string) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_NKT'));

    const existing = await this.prisma.savedJob.findUnique({
      where: {
        jobId_nktProfileId: { jobId, nktProfileId: profile.id },
      },
    });

    if (!existing) {
      throw new NotFoundException(this.i18n.t('messages.saved_job.NOT_SAVED'));
    }

    await this.prisma.savedJob.delete({
      where: { id: existing.id },
    });

    return true;
  }
}
