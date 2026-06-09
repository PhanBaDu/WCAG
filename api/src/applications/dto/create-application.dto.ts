/**
 * @file        src/applications/dto/create-application.dto.ts
 * @description DTO for submitting a job application
 * @module      ApplicationsModule
 */

import { IsString, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateApplicationDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  jobId: string;

  @ApiPropertyOptional({ example: 'Tôi có kinh nghiệm ReactJS và rất mong muốn được làm việc tại công ty...' })
  @IsOptional()
  @IsString()
  coverLetter?: string;

  @ApiPropertyOptional({ example: '/uploads/cv-snapshot.pdf' })
  @IsOptional()
  @IsString()
  cvSnapshot?: string;
}
