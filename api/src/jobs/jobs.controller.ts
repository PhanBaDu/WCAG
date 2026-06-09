/**
 * @file        src/jobs/jobs.controller.ts
 * @description Jobs HTTP endpoints
 * @module      JobsModule
 */

import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Jobs')
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách việc làm đang active (có phân trang)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({ status: 200 })
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ): Promise<ApiResponseDto> {
    const pageNum = page ? parseInt(page, 10) : 1;
    const limitNum = limit ? parseInt(limit, 10) : 10;
    const data = await this.jobsService.findAll(pageNum, limitNum, search);
    return ApiResponseDto.success(data, this.i18n.t('messages.job.FETCH_SUCCESS'));
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Lấy chi tiết tin tuyển dụng theo slug' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('slug') slug: string): Promise<ApiResponseDto> {
    const data = await this.jobsService.findOne(slug);
    return ApiResponseDto.success(data, this.i18n.t('messages.job.FETCH_SUCCESS'));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Đăng tin tuyển dụng mới (dành cho NTD)' })
  @ApiResponse({ status: 201 })
  async create(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateJobDto
  ): Promise<ApiResponseDto> {
    const data = await this.jobsService.create(userId, dto);
    return ApiResponseDto.success(data, this.i18n.t('messages.job.CREATE_SUCCESS'));
  }
}
