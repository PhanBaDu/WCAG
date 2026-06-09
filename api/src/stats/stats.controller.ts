/**
 * @file        src/stats/stats.controller.ts
 * @description Stats HTTP endpoints
 * @module      StatsModule
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { StatsService } from './stats.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Statistics & Reports')
@Controller('stats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    private readonly i18n: I18nService,
  ) {}

  @Get('admin')
  @ApiOperation({ summary: 'Xem thống kê tổng quan (Dành cho Admin)' })
  @ApiResponse({ status: 200 })
  async getAdminStats(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.statsService.getAdminStats(userId);
    return ApiResponseDto.success(data, this.i18n.t('messages.stats.FETCH_SUCCESS'));
  }

  @Get('employer')
  @ApiOperation({ summary: 'Xem thống kê tuyển dụng (Dành cho NTD)' })
  @ApiResponse({ status: 200 })
  async getEmployerStats(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.statsService.getEmployerStats(userId);
    return ApiResponseDto.success(data, this.i18n.t('messages.stats.FETCH_SUCCESS'));
  }
}
