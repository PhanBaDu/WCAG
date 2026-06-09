/**
 * @file        src/nkt-profile/dto/update-nkt-profile.dto.ts
 * @description DTO for updating NKT Profile
 * @module      NktProfileModule
 */

import { IsOptional, IsString, IsArray, IsEnum, MinLength, IsInt, Min } from 'class-validator';
import { DisabilityType } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNktProfileDto {
  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional() @IsString() @MinLength(2) fullName?: string;

  @ApiPropertyOptional({ example: '0901234567' })
  @IsOptional() @IsString() phone?: string;

  @ApiPropertyOptional({ example: '1995-01-01' })
  @IsOptional() @IsString() dateOfBirth?: string;

  @ApiPropertyOptional({ example: 'Hà Nội' })
  @IsOptional() @IsString() province?: string;

  @ApiPropertyOptional({ example: 'Lập trình viên frontend với 2 năm kinh nghiệm...' })
  @IsOptional() @IsString() summary?: string;

  @ApiPropertyOptional({ example: ['React', 'NestJS'] })
  @IsOptional() @IsArray() @IsString({ each: true }) skills?: string[];

  @ApiPropertyOptional({ example: 10000000 })
  @IsOptional() @IsInt() @Min(0) expectedSalaryMin?: number;

  @ApiPropertyOptional({ example: 20000000 })
  @IsOptional() @IsInt() expectedSalaryMax?: number;

  @ApiPropertyOptional({ enum: DisabilityType, isArray: true })
  @IsOptional() @IsArray() @IsEnum(DisabilityType, { each: true }) disabilityTypes?: DisabilityType[];

  @ApiPropertyOptional({ example: ['Phần mềm đọc màn hình', 'Bàn phím nổi'] })
  @IsOptional() @IsArray() @IsString({ each: true }) supportNeeds?: string[];

  @ApiPropertyOptional({ example: ['full-time', 'remote'] })
  @IsOptional() @IsArray() @IsString({ each: true }) jobTypes?: string[];

  @ApiPropertyOptional({ example: ['IT', 'Thiết kế đồ họa'] })
  @IsOptional() @IsArray() @IsString({ each: true }) preferredIndustries?: string[];

  @ApiPropertyOptional({ example: '/uploads/cv-uuid.pdf' })
  @IsOptional() @IsString() cvUrl?: string;
  
  @ApiPropertyOptional({ example: '/uploads/avatar-uuid.jpg' })
  @IsOptional() @IsString() avatar?: string;
}
