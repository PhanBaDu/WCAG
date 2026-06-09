/**
 * @file        src/jobs/jobs.service.spec.ts
 * @description Unit tests for Jobs Service
 */

import { Test, TestingModule } from '@nestjs/testing';
import { JobsService } from './jobs.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, ConflictException } from '@nestjs/common';
import { DisabilityType } from '@prisma/client';

describe('JobsService', () => {
  let service: JobsService;
  let prismaService: any;

  beforeEach(async () => {
    prismaService = {
      employer: { findUnique: jest.fn() },
      job: { create: jest.fn(), findMany: jest.fn(), count: jest.fn() },
      $transaction: jest.fn((promises) => Promise.all(promises)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JobsService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<JobsService>(JobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('throws ForbiddenException if user is not an employer', async () => {
      prismaService.employer.findUnique.mockResolvedValue(null);

      await expect(
        service.create('some-user-id', {
          title: 'Dev',
          description: 'Desc',
          industry: 'IT',
          jobTypes: ['full-time'],
          acceptedDisabilityTypes: [DisabilityType.MOBILITY],
          isDisabilityPriority: true,
        }),
      ).rejects.toThrow(ForbiddenException);
    });

    it('throws ConflictException if acceptedDisabilityTypes is empty', async () => {
      prismaService.employer.findUnique.mockResolvedValue({ id: 'employer-id' });

      await expect(
        service.create('some-user-id', {
          title: 'Dev',
          description: 'Desc',
          industry: 'IT',
          jobTypes: ['full-time'],
          acceptedDisabilityTypes: [], // Rỗng
          isDisabilityPriority: true,
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('creates a job successfully with PENDING status', async () => {
      prismaService.employer.findUnique.mockResolvedValue({ id: 'employer-id' });
      prismaService.job.create.mockImplementation(({ data }) => Promise.resolve({ ...data, id: 'job-id' }));

      const result = await service.create('some-user-id', {
        title: 'Frontend Developer',
        description: 'React, Vue',
        industry: 'IT',
        jobTypes: ['full-time'],
        acceptedDisabilityTypes: [DisabilityType.MOBILITY],
        isDisabilityPriority: true,
      });

      expect(result.status).toBe('PENDING');
      expect(result.employerId).toBe('employer-id');
      expect(result.slug).toContain('frontend-developer');
      expect(prismaService.job.create).toHaveBeenCalled();
    });
  });
});
