/**
 * @file        src/applications/applications.service.ts
 * @description Applications Service handling business logic
 * @module      ApplicationsModule
 */

import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async applyForJob(userId: string, dto: CreateApplicationDto) {
    const profile = await this.prisma.nKTProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_NKT'));
    }

    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job || job.status !== 'ACTIVE') {
      throw new NotFoundException(this.i18n.t('messages.job.NOT_FOUND'));
    }

    const existingApp = await this.prisma.application.findUnique({
      where: {
        jobId_nktProfileId: { jobId: dto.jobId, nktProfileId: profile.id },
      },
    });

    if (existingApp) {
      throw new ConflictException(this.i18n.t('messages.application.ALREADY_APPLIED'));
    }

    const cvUrl = dto.cvSnapshot || profile.cvUrl;
    
    return this.prisma.$transaction(async (tx) => {
      const application = await tx.application.create({
        data: {
          jobId: dto.jobId,
          nktProfileId: profile.id,
          coverLetter: dto.coverLetter,
          cvSnapshot: cvUrl,
          status: 'SUBMITTED',
        },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: application.id,
          status: 'SUBMITTED',
          changedBy: userId,
          note: 'Ứng viên nộp hồ sơ',
        },
      });

      // TODO: Create Notification for Employer

      return application;
    });
  }

  async getMyApplications(userId: string) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_NKT'));

    return this.prisma.application.findMany({
      where: { nktProfileId: profile.id },
      include: {
        job: { select: { title: true, slug: true, employer: { select: { companyName: true } } } },
      },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async getJobApplications(employerUserId: string, jobId: string) {
    const employer = await this.prisma.employer.findUnique({ where: { userId: employerUserId } });
    if (!employer) throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_EMPLOYER'));

    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job || job.employerId !== employer.id) {
      throw new ForbiddenException(this.i18n.t('messages.application.NO_PERMISSION'));
    }

    return this.prisma.application.findMany({
      where: { jobId },
      include: {
        nktProfile: { select: { fullName: true, disabilityTypes: true, skills: true } },
      },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async updateApplicationStatus(employerUserId: string, applicationId: string, dto: UpdateApplicationStatusDto) {
    const employer = await this.prisma.employer.findUnique({ where: { userId: employerUserId } });
    if (!employer) throw new ForbiddenException(this.i18n.t('messages.common.FORBIDDEN_EMPLOYER'));

    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true },
    });

    if (!application || application.job.employerId !== employer.id) {
      throw new ForbiddenException(this.i18n.t('messages.application.NO_PERMISSION'));
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.application.update({
        where: { id: applicationId },
        data: { status: dto.status },
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: updated.id,
          status: dto.status,
          changedBy: employerUserId,
          note: dto.note,
        },
      });

      // TODO: Send notification to candidate

      return updated;
    });
  }
}
