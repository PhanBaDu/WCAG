/**
 * @file        src/applications/employer-applications.controller.ts
 * @description Applications HTTP endpoints for Employer
 * @module      ApplicationsModule
 */

import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Applications (For Employers)')
@Controller('employer/applications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EmployerApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get('job/:jobId')
  @ApiOperation({ summary: 'Xem danh sách ứng viên nộp vào tin tuyển dụng (dành cho NTD)' })
  @ApiResponse({ status: 200, description: 'Danh sách ứng viên' })
  async getJobApplications(
    @CurrentUser('userId') userId: string,
    @Param('jobId') jobId: string
  ): Promise<ApiResponseDto> {
    const data = await this.applicationsService.getJobApplications(userId, jobId);
    return ApiResponseDto.success(data, 'Lấy danh sách ứng viên thành công');
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Đánh giá/Thay đổi trạng thái ứng viên (dành cho NTD)' })
  @ApiResponse({ status: 200, description: 'Cập nhật trạng thái thành công' })
  async updateApplicationStatus(
    @CurrentUser('userId') userId: string,
    @Param('id') applicationId: string,
    @Body() dto: UpdateApplicationStatusDto
  ): Promise<ApiResponseDto> {
    const data = await this.applicationsService.updateApplicationStatus(userId, applicationId, dto);
    return ApiResponseDto.success(data, 'Cập nhật trạng thái thành công');
  }
}
