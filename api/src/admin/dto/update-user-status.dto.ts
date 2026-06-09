/**
 * @file        src/admin/dto/update-user-status.dto.ts
 * @description DTO for admin to update user status
 * @module      AdminModule
 */

import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatusDto {
  @ApiProperty({ example: false, description: 'True to activate, false to deactivate' })
  @IsBoolean()
  isActive: boolean;
  
  @ApiProperty({ example: 'Vi phạm chính sách cộng đồng' })
  @IsOptional()
  @IsString()
  reason?: string;
}
