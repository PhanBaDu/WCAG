/**
 * @file        src/applications/applications.service.ts
 * @description Applications Service handling business logic
 * @module      ApplicationsModule
 */

import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  // --- Cho Người Khuyết Tật (NKT) ---
  
  async applyForJob(userId: string, dto: CreateApplicationDto) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException('Chỉ ứng viên NKT mới được ứng tuyển');

    const job = await this.prisma.job.findUnique({ where: { id: dto.jobId } });
    if (!job || job.status !== 'ACTIVE') {
      throw new NotFoundException('Tin tuyển dụng không tồn tại hoặc đã đóng');
    }

    const existingApplication = await this.prisma.application.findUnique({
      where: {
        jobId_nktProfileId: { jobId: dto.jobId, nktProfileId: profile.id }
      }
    });

    if (existingApplication) {
      throw new ConflictException('Bạn đã ứng tuyển công việc này rồi');
    }

    const application = await this.prisma.$transaction(async (tx) => {
      const app = await tx.application.create({
        data: {
          jobId: dto.jobId,
          nktProfileId: profile.id,
          coverLetter: dto.coverLetter,
          cvSnapshot: dto.cvSnapshot || profile.cvUrl,
          status: 'SUBMITTED',
        }
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: app.id,
          status: 'SUBMITTED',
        }
      });

      return app;
    });

    return application;
  }

  async getMyApplications(userId: string) {
    const profile = await this.prisma.nKTProfile.findUnique({ where: { userId } });
    if (!profile) throw new ForbiddenException('Chỉ ứng viên NKT mới có lịch sử ứng tuyển');

    return this.prisma.application.findMany({
      where: { nktProfileId: profile.id },
      include: {
        job: { select: { title: true, employer: { select: { companyName: true } } } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // --- Cho Nhà Tuyển Dụng (Employer) ---

  async getJobApplications(userId: string, jobId: string) {
    const employer = await this.prisma.employer.findUnique({ where: { userId } });
    if (!employer) throw new ForbiddenException('Chỉ NTD mới được xem ứng viên');

    const job = await this.prisma.job.findFirst({
      where: { id: jobId, employerId: employer.id }
    });

    if (!job) throw new ForbiddenException('Bạn không có quyền xem ứng viên của job này');

    return this.prisma.application.findMany({
      where: { jobId },
      include: {
        nktProfile: {
          select: {
            fullName: true,
            avatar: true,
            disabilityTypes: true,
            skills: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateApplicationStatus(userId: string, applicationId: string, dto: UpdateApplicationStatusDto) {
    const employer = await this.prisma.employer.findUnique({ where: { userId } });
    if (!employer) throw new ForbiddenException('Chỉ NTD mới được thao tác');

    const application = await this.prisma.application.findUnique({
      where: { id: applicationId },
      include: { job: true }
    });

    if (!application || application.job.employerId !== employer.id) {
      throw new ForbiddenException('Bạn không có quyền thao tác trên đơn này');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const app = await tx.application.update({
        where: { id: applicationId },
        data: {
          status: dto.status,
          employerNote: dto.employerNote,
        }
      });

      await tx.applicationStatusHistory.create({
        data: {
          applicationId: app.id,
          status: dto.status,
          note: dto.employerNote,
        }
      });

      return app;
    });

    return updated;
  }
}
