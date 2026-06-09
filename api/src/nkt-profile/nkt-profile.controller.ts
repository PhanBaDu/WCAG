/**
 * @file        src/nkt-profile/nkt-profile.controller.ts
 * @description NKT Profile HTTP endpoints
 * @module      NktProfileModule
 */

import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { NktProfileService } from './nkt-profile.service';
import { UpdateNktProfileDto } from './dto/update-nkt-profile.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('NKT Profile')
@Controller('nkt-profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NktProfileController {
  constructor(private readonly profileService: NktProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin hồ sơ NKT hiện tại (dành cho người đang đăng nhập)' })
  @ApiResponse({ status: 200, description: 'Lấy hồ sơ thành công' })
  async getProfile(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.profileService.getProfile(userId);
    return ApiResponseDto.success(data, 'Lấy hồ sơ thành công');
  }

  @Patch()
  @ApiOperation({ summary: 'Cập nhật hồ sơ NKT (thông tin, kỹ năng, dạng khuyết tật...)' })
  @ApiResponse({ status: 200, description: 'Cập nhật hồ sơ thành công' })
  async updateProfile(
    @CurrentUser('userId') userId: string, 
    @Body() dto: UpdateNktProfileDto
  ): Promise<ApiResponseDto> {
    const data = await this.profileService.updateProfile(userId, dto);
    return ApiResponseDto.success(data, 'Cập nhật hồ sơ thành công');
  }
}
