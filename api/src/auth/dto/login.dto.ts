/**
 * @file        src/auth/dto/login.dto.ts
 * @description Login DTO
 * @module      AuthModule
 */

import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @Transform(({ value }) => value?.toLowerCase()?.trim())
  email: string;

  @ApiProperty({ example: 'StrongP@ss123!' })
  @IsString()
  @MinLength(8, { message: 'Mật khẩu phải từ 8 ký tự' })
  password: string;
}
