/**
 * @file        src/jobs/dto/create-job.dto.ts
 * @description DTO for creating a job
 * @module      JobsModule
 */

import { IsString, MinLength, MaxLength, IsArray, IsIn, IsOptional, IsInt, Min, IsEnum, IsBoolean, IsDateString } from 'class-validator';
import { DisabilityType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty({ example: 'Lập trình viên Frontend' })
  @IsString() @MinLength(5) @MaxLength(200) 
  title: string;

  @ApiProperty({ example: 'Mô tả công việc chi tiết...' })
  @IsString() @MinLength(50) @MaxLength(10000) 
  description: string;

  @ApiProperty({ example: 'IT' })
  @IsString() 
  industry: string;

  @ApiProperty({ example: ['full-time', 'remote'] })
  @IsArray() @IsIn(['full-time','part-time','remote','hybrid'], { each: true }) 
  jobTypes: string[];

  @ApiPropertyOptional({ example: 10000000 })
  @IsOptional() @IsInt() @Min(0) 
  salaryMin?: number;

  @ApiPropertyOptional({ example: 20000000 })
  @IsOptional() @IsInt() 
  salaryMax?: number;

  @ApiPropertyOptional({ example: 'Hà Nội' })
  @IsOptional() @IsString() 
  province?: string;

  @ApiProperty({ enum: DisabilityType, isArray: true })
  @IsArray() @IsEnum(DisabilityType, { each: true }) 
  acceptedDisabilityTypes: DisabilityType[];

  @ApiPropertyOptional({ example: ['Hỗ trợ xe lăn', 'Màn hình lớn'] })
  @IsOptional() @IsArray() @IsString({ each: true }) 
  accommodationsOffered?: string[];

  @ApiProperty({ example: true })
  @IsBoolean() 
  isDisabilityPriority: boolean;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59Z' })
  @IsOptional() @IsDateString() 
  expiresAt?: string;
}
