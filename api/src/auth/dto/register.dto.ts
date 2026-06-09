/**
 * @file        src/auth/dto/register.dto.ts
 * @description Register DTO with validation rules
 * @module      AuthModule
 */

import { IsEmail, IsString, MinLength, Matches, IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: i18nValidationMessage('messages.validation.IS_EMAIL') })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  email: string;

  @ApiProperty({ example: 'StrongP@ss123!', description: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character' })
  @MinLength(8, { message: i18nValidationMessage('messages.validation.MIN_LENGTH') })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: i18nValidationMessage('messages.validation.PASSWORD_STRENGTH'),
  })
  password: string;

  @ApiProperty({ enum: ['NKT', 'NTD'] })
  @IsIn(['NKT', 'NTD'], { message: i18nValidationMessage('messages.validation.IS_IN') })
  role: Role;

  @ApiPropertyOptional({ example: 'Nguyễn Văn A' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: i18nValidationMessage('messages.validation.MIN_LENGTH') })
  fullName?: string;

  @ApiPropertyOptional({ example: 'Công ty TNHH ABC' })
  @IsOptional()
  @IsString()
  @MinLength(2, { message: i18nValidationMessage('messages.validation.MIN_LENGTH') })
  companyName?: string;
}
