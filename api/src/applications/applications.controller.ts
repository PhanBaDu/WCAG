/**
 * @file        src/applications/applications.controller.ts
 * @description Applications HTTP endpoints for NKT
 * @module      ApplicationsModule
 */

import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Applications (For Candidates)')
@Controller('applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly i18n: I18nService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Nộp hồ sơ ứng tuyển vào 1 tin tuyển dụng (dành cho NKT)' })
  @ApiResponse({ status: 201, description: 'Ứng tuyển thành công' })
  async applyForJob(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateApplicationDto
  ): Promise<ApiResponseDto> {
    const data = await this.applicationsService.applyForJob(userId, dto);
    return ApiResponseDto.success(data, this.i18n.t('messages.application.APPLY_SUCCESS'));
  }

  @Get('my')
  @ApiOperation({ summary: 'Xem danh sách lịch sử công việc đã ứng tuyển (dành cho NKT)' })
  @ApiResponse({ status: 200, description: 'Danh sách lịch sử ứng tuyển' })
  async getMyApplications(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.applicationsService.getMyApplications(userId);
    return ApiResponseDto.success(data, this.i18n.t('messages.application.FETCH_SUCCESS'));
  }
}
