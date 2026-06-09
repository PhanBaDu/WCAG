/**
 * @file        src/stats/stats.service.ts
 * @description Statistics and reporting Service
 * @module      StatsModule
 */

import { Injectable, ForbiddenException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async getAdminStats(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'ADMIN') {
      throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_ADMIN'));
    }

    const [totalUsers, totalNKT, totalEmployers, totalJobs, activeJobs] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { role: 'NKT' } }),
      this.prisma.user.count({ where: { role: 'NTD' } }),
      this.prisma.job.count(),
      this.prisma.job.count({ where: { status: 'ACTIVE' } }),
    ]);

    return {
      users: { total: totalUsers, nkt: totalNKT, employers: totalEmployers },
      jobs: { total: totalJobs, active: activeJobs },
    };
  }

  async getEmployerStats(userId: string) {
    const employer = await this.prisma.employer.findUnique({ where: { userId } });
    if (!employer) {
      throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_EMPLOYER'));
    }

    const jobs = await this.prisma.job.findMany({
      where: { employerId: employer.id },
      select: { id: true, viewCount: true },
    });

    const jobIds = jobs.map((j) => j.id);
    const totalViews = jobs.reduce((sum, j) => sum + j.viewCount, 0);

    const applications = await this.prisma.application.findMany({
      where: { jobId: { in: jobIds } },
      select: { status: true },
    });

    const appStatusCounts = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalJobs: jobs.length,
      totalViews,
      totalApplications: applications.length,
      applicationStatuses: appStatusCounts,
    };
  }
}
