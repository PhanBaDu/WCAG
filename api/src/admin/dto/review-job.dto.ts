/**
 * @file        src/admin/dto/review-job.dto.ts
 * @description DTO for admin to review a job
 * @module      AdminModule
 */

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { JobStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ReviewJobDto {
  @ApiProperty({ enum: ['ACTIVE', 'REJECTED'] })
  @IsEnum(JobStatus)
  status: JobStatus;

  @ApiPropertyOptional({ example: 'Tin tuyển dụng không hợp lệ do...' })
  @IsOptional()
  @IsString()
  adminNote?: string;
}
