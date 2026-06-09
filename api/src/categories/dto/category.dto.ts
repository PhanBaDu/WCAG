/**
 * @file        src/categories/dto/category.dto.ts
 * @description DTOs for Job Category
 * @module      CategoriesModule
 */

import { IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Công nghệ thông tin' })
  @IsString()
  @MinLength(2)
  name: string;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional({ example: 'Kế toán - Kiểm toán' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;
}
