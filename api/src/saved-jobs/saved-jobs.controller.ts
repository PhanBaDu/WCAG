/**
 * @file        src/saved-jobs/saved-jobs.controller.ts
 * @description Saved Jobs HTTP endpoints
 * @module      SavedJobsModule
 */

import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SavedJobsService } from './saved-jobs.service';
import { SaveJobDto } from './dto/save-job.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Saved Jobs (For Candidates)')
@Controller('saved-jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SavedJobsController {
  constructor(private readonly savedJobsService: SavedJobsService) {}

  @Post()
  @ApiOperation({ summary: 'Lưu tin tuyển dụng yêu thích' })
  @ApiResponse({ status: 201, description: 'Lưu việc làm thành công' })
  async saveJob(
    @CurrentUser('userId') userId: string,
    @Body() dto: SaveJobDto
  ): Promise<ApiResponseDto> {
    const data = await this.savedJobsService.saveJob(userId, dto);
    return ApiResponseDto.success(data, 'Lưu việc làm thành công');
  }

  @Get()
  @ApiOperation({ summary: 'Xem danh sách việc làm đã lưu' })
  @ApiResponse({ status: 200, description: 'Danh sách việc làm' })
  async getSavedJobs(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.savedJobsService.getSavedJobs(userId);
    return ApiResponseDto.success(data, 'Lấy danh sách thành công');
  }

  @Delete(':jobId')
  @ApiOperation({ summary: 'Bỏ lưu việc làm' })
  @ApiResponse({ status: 200, description: 'Đã bỏ lưu' })
  async removeSavedJob(
    @CurrentUser('userId') userId: string,
    @Param('jobId') jobId: string
  ): Promise<ApiResponseDto> {
    await this.savedJobsService.removeSavedJob(userId, jobId);
    return ApiResponseDto.success(null, 'Đã bỏ lưu việc làm');
  }
}
