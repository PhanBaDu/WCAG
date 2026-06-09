/**
 * @file        src/stats/stats.controller.ts
 * @description Stats HTTP endpoints
 * @module      StatsModule
 */

import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Statistics & Reports')
@Controller('stats')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('admin')
  @ApiOperation({ summary: 'Xem thống kê tổng quan (Dành cho Admin)' })
  @ApiResponse({ status: 200 })
  async getAdminStats(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.statsService.getAdminStats(userId);
    return ApiResponseDto.success(data, 'Lấy báo cáo hệ thống thành công');
  }

  @Get('employer')
  @ApiOperation({ summary: 'Xem thống kê tuyển dụng (Dành cho NTD)' })
  @ApiResponse({ status: 200 })
  async getEmployerStats(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.statsService.getEmployerStats(userId);
    return ApiResponseDto.success(data, 'Lấy báo cáo tuyển dụng thành công');
  }
}
