/**
 * @file        src/employer/dto/update-employer.dto.ts
 * @description DTO for updating employer profile
 * @module      EmployerModule
 */

import { IsOptional, IsString, IsArray, IsBoolean, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEmployerDto {
  @ApiPropertyOptional({ example: 'Công ty TNHH ABC' })
  @IsOptional() @IsString() @MinLength(2) companyName?: string;

  @ApiPropertyOptional({ example: '/uploads/logo.png' })
  @IsOptional() @IsString() companyLogo?: string;

  @ApiPropertyOptional({ example: '100-499 nhân viên' })
  @IsOptional() @IsString() companySize?: string;

  @ApiPropertyOptional({ example: 'Công nghệ thông tin' })
  @IsOptional() @IsString() industry?: string;

  @ApiPropertyOptional({ example: 'https://example.com' })
  @IsOptional() @IsString() website?: string;

  @ApiPropertyOptional({ example: 'Mô tả công ty...' })
  @IsOptional() @IsString() description?: string;

  @ApiPropertyOptional({ example: 'Số 1 Phạm Văn Đồng' })
  @IsOptional() @IsString() address?: string;

  @ApiPropertyOptional({ example: 'Hà Nội' })
  @IsOptional() @IsString() province?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional() @IsBoolean() isDisabilityFriendly?: boolean;

  @ApiPropertyOptional({ example: ['Có dốc xe lăn', 'Phần mềm cho người khiếm thị'] })
  @IsOptional() @IsArray() @IsString({ each: true }) accommodations?: string[];
}
