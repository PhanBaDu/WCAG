/**
 * @file        src/auth/dto/login.dto.ts
 * @description Login DTO
 * @module      AuthModule
 */

import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { i18nValidationMessage } from 'nestjs-i18n';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: i18nValidationMessage('messages.validation.IS_EMAIL') })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  email: string;

  @ApiProperty({ example: 'StrongP@ss123!' })
  @IsString()
  @MinLength(8, { message: i18nValidationMessage('messages.validation.MIN_LENGTH') })
  password: string;
}
