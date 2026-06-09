/**
 * @file        src/applications/applications.controller.ts
 * @description Applications HTTP endpoints for NKT
 * @module      ApplicationsModule
 */

import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Nộp CV ứng tuyển vào việc làm' })
  @ApiResponse({ status: 201, description: 'Ứng tuyển thành công' })
  async apply(
    @CurrentUser('userId') userId: string,
    @Body() dto: CreateApplicationDto
  ): Promise<ApiResponseDto> {
    const data = await this.applicationsService.applyForJob(userId, dto);
    return ApiResponseDto.success(data, 'Ứng tuyển thành công');
  }

  @Get('my')
  @ApiOperation({ summary: 'Xem lịch sử các việc làm đã ứng tuyển' })
  @ApiResponse({ status: 200, description: 'Lịch sử ứng tuyển' })
  async getMyApplications(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.applicationsService.getMyApplications(userId);
    return ApiResponseDto.success(data, 'Lấy lịch sử ứng tuyển thành công');
  }
}
