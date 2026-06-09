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
import { QueryJobDto } from './dto/query-job.dto';
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
  @ApiOperation({ summary: 'Tìm kiếm & lọc danh sách việc làm' })
  @ApiResponse({ status: 200, description: 'Danh sách việc làm' })
  async findAll(@Query() query: QueryJobDto): Promise<ApiResponseDto> {
    const result = await this.jobsService.findAll(query);
    return ApiResponseDto.paginated(
      result.data,
      { page: result.page, limit: result.limit, total: result.total, totalPages: result.totalPages },
      this.i18n.t('messages.job.FETCH_SUCCESS')
    );
  }

  @Get(':slug')
  @ApiOperation({ summary: 'Lấy chi tiết tin tuyển dụng theo slug' })
  @ApiResponse({ status: 200 })
  async findOne(@Param('slug') slug: string): Promise<ApiResponseDto> {
    const data = await this.jobsService.findOneBySlug(slug);
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
