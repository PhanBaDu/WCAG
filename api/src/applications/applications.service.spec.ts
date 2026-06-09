/**
 * @file        src/applications/applications.service.spec.ts
 * @description Unit tests for Applications Service
 */

import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsService } from './applications.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, ConflictException, NotFoundException } from '@nestjs/common';

describe('ApplicationsService', () => {
  let service: ApplicationsService;
  let prismaService: any;

  beforeEach(async () => {
    prismaService = {
      nKTProfile: { findUnique: jest.fn() },
      job: { findUnique: jest.fn() },
      application: { findUnique: jest.fn(), create: jest.fn() },
      applicationStatusHistory: { create: jest.fn() },
      $transaction: jest.fn((cb) => cb(prismaService)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        { provide: PrismaService, useValue: prismaService },
      ],
    }).compile();

    service = module.get<ApplicationsService>(ApplicationsService);
  });

  describe('applyForJob()', () => {
    it('throws ForbiddenException if user has no NKT profile', async () => {
      prismaService.nKTProfile.findUnique.mockResolvedValue(null);

      await expect(service.applyForJob('user-id', { jobId: 'job-id' })).rejects.toThrow(ForbiddenException);
    });

    it('throws NotFoundException if job is not ACTIVE', async () => {
      prismaService.nKTProfile.findUnique.mockResolvedValue({ id: 'profile-id' });
      prismaService.job.findUnique.mockResolvedValue({ status: 'PENDING' }); // Not ACTIVE

      await expect(service.applyForJob('user-id', { jobId: 'job-id' })).rejects.toThrow(NotFoundException);
    });

    it('throws ConflictException if user already applied to this job', async () => {
      prismaService.nKTProfile.findUnique.mockResolvedValue({ id: 'profile-id' });
      prismaService.job.findUnique.mockResolvedValue({ status: 'ACTIVE' });
      prismaService.application.findUnique.mockResolvedValue({ id: 'app-id' }); // Already exists

      await expect(service.applyForJob('user-id', { jobId: 'job-id' })).rejects.toThrow(ConflictException);
    });

    it('creates an application successfully', async () => {
      prismaService.nKTProfile.findUnique.mockResolvedValue({ id: 'profile-id', cvUrl: 'default.pdf' });
      prismaService.job.findUnique.mockResolvedValue({ status: 'ACTIVE' });
      prismaService.application.findUnique.mockResolvedValue(null);
      prismaService.application.create.mockResolvedValue({ id: 'new-app-id', status: 'SUBMITTED' });

      const result = await service.applyForJob('user-id', { jobId: 'job-id', coverLetter: 'Hello' });

      expect(prismaService.application.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          jobId: 'job-id',
          nktProfileId: 'profile-id',
          coverLetter: 'Hello',
          cvSnapshot: 'default.pdf',
          status: 'SUBMITTED',
        }),
      });
      expect(result.status).toBe('SUBMITTED');
    });
  });
});
