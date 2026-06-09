/**
 * @file        src/saved-jobs/dto/save-job.dto.ts
 * @description DTO for saving a job
 * @module      SavedJobsModule
 */

import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveJobDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  jobId: string;
}
