/**
 * @file        src/employer/employer.controller.ts
 * @description Employer HTTP endpoints
 * @module      EmployerModule
 */

import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Employer Profile')
@Controller('employer')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EmployerController {
  constructor(
    private readonly employerService: EmployerService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy thông tin công ty hiện tại (dành cho NTD đang đăng nhập)' })
  @ApiResponse({ status: 200, description: 'Lấy hồ sơ thành công' })
  async getProfile(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.employerService.getProfile(userId);
    return ApiResponseDto.success(data, this.i18n.t('messages.profile.FETCH_SUCCESS'));
  }

  @Patch()
  @ApiOperation({ summary: 'Cập nhật thông tin công ty' })
  @ApiResponse({ status: 200, description: 'Cập nhật hồ sơ thành công' })
  async updateProfile(
    @CurrentUser('userId') userId: string, 
    @Body() dto: UpdateEmployerDto
  ): Promise<ApiResponseDto> {
    const data = await this.employerService.updateProfile(userId, dto);
    return ApiResponseDto.success(data, this.i18n.t('messages.profile.UPDATE_SUCCESS'));
  }
}
