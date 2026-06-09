/**
 * @file        src/jobs/dto/query-job.dto.ts
 * @description DTO for querying jobs
 * @module      JobsModule
 */

import { IsOptional, IsString, IsEnum, IsIn, IsInt, Min, Max, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { DisabilityType } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryJobDto {
  @ApiPropertyOptional()
  @IsOptional() @IsString()
  q?: string;

  @ApiPropertyOptional({ enum: DisabilityType, isArray: true })
  @IsOptional() @IsEnum(DisabilityType, { each: true })
  disabilityTypes?: DisabilityType[];

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  province?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsString()
  industry?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsIn(['full-time','part-time','remote','hybrid'], { each: true })
  jobTypes?: string[];

  @ApiPropertyOptional()
  @IsOptional() @IsInt() @Min(0) @Type(() => Number)
  salaryMin?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsInt() @Type(() => Number)
  salaryMax?: number;

  @ApiPropertyOptional()
  @IsOptional() @IsBoolean() @Type(() => Boolean)
  isDisabilityPriority?: boolean;

  @ApiPropertyOptional()
  @IsOptional() @IsIn(['relevance','date','salary'])
  sortBy?: string;

  @ApiPropertyOptional()
  @IsOptional() @IsInt() @Min(1) @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional()
  @IsOptional() @IsInt() @Min(1) @Max(50) @Type(() => Number)
  limit?: number = 20;
}
