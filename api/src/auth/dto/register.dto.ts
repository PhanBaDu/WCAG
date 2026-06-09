/**
 * @file        src/auth/dto/register.dto.ts
 * @description Register DTO with validation rules
 * @module      AuthModule
 */

import { IsEmail, IsString, MinLength, Matches, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  email: string;

  @ApiProperty({ example: 'StrongP@ss123!', description: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character' })
  @MinLength(8, { message: 'Mật khẩu tối thiểu 8 ký tự' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
  })
  password: string;

  @ApiProperty({ enum: ['NKT', 'NTD'] })
  @IsIn(['NKT', 'NTD'], { message: 'Quyền không hợp lệ' })
  role: Role;

  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Họ tên tối thiểu 2 ký tự' })
  fullName?: string;

  @ApiPropertyOptional({ example: 'Công ty TNHH ABC' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'Tên công ty tối thiểu 2 ký tự' })
  companyName?: string;
}
