/**
 * @file        src/jobs/jobs.service.ts
 * @description Jobs Service handling business logic
 * @module      JobsModule
 */

import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { QueryJobDto } from './dto/query-job.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryJobDto) {
    const { q, page = 1, limit = 20, province, industry, sortBy = 'date' } = query;

    const where: Prisma.JobWhereInput = {
      status: 'ACTIVE',
      deletedAt: null,
      ...(province && { province }),
      ...(industry && { industry }),
      ...(query.disabilityTypes?.length && {
        acceptedDisabilityTypes: { hasSome: query.disabilityTypes },
      }),
    };

    // Note: Full-text search with pg_trgm and tsvector would require raw query.
    // For simplicity without breaking, we use Prisma's `contains` if `q` exists.
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        include: { employer: { select: { companyName: true, companyLogo: true } } },
        orderBy: sortBy === 'salary'
          ? { salaryMax: 'desc' }
          : { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.job.count({ where }),
    ]);

    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOneBySlug(slug: string) {
    const job = await this.prisma.job.findUnique({
      where: { slug },
      include: { employer: { select: { companyName: true, companyLogo: true, description: true, accommodations: true } } }
    });

    if (!job || job.deletedAt) {
      throw new NotFoundException('Không tìm thấy tin tuyển dụng');
    }

    // Increment view async - usually via queue, doing directly for now
    this.prisma.job.update({
      where: { id: job.id },
      data: { viewCount: { increment: 1 } }
    }).catch(console.error);

    return job;
  }

  async create(userId: string, dto: CreateJobDto) {
    const employer = await this.prisma.employer.findUnique({ where: { userId } });
    if (!employer) {
      throw new ForbiddenException('Chỉ nhà tuyển dụng mới được đăng tin');
    }

    if (!dto.acceptedDisabilityTypes?.length) {
      throw new ConflictException('Phải chọn ít nhất 1 dạng khuyết tật được chấp nhận');
    }

    // Simple slug generator
    const slug = dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 8);

    const job = await this.prisma.job.create({
      data: {
        ...dto,
        slug,
        employerId: employer.id,
        status: 'PENDING',
      },
    });

    return job;
  }
}
