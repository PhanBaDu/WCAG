/**
 * @file        src/applications/dto/update-application-status.dto.ts
 * @description DTO for employer to update application status
 * @module      ApplicationsModule
 */

import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateApplicationStatusDto {
  @ApiProperty({ enum: ApplicationStatus })
  @IsEnum(ApplicationStatus)
  status: ApplicationStatus;

  @ApiPropertyOptional({ example: 'Hẹn phỏng vấn vào lúc 14:00 thứ 6' })
  @IsOptional()
  @IsString()
  employerNote?: string;
}
