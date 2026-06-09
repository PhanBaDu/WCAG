/**
 * @file        src/admin/admin.controller.ts
 * @description Admin HTTP endpoints
 * @module      AdminModule
 */

import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { ReviewJobDto } from './dto/review-job.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Admin Dashboard')
@Controller('admin')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('jobs/pending')
  @ApiOperation({ summary: 'Xem danh sách tin tuyển dụng chờ duyệt' })
  @ApiResponse({ status: 200 })
  async getPendingJobs(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.adminService.getPendingJobs(userId);
    return ApiResponseDto.success(data, 'Lấy danh sách thành công');
  }

  @Patch('jobs/:id/review')
  @ApiOperation({ summary: 'Duyệt hoặc từ chối tin tuyển dụng' })
  @ApiResponse({ status: 200 })
  async reviewJob(
    @CurrentUser('userId') userId: string,
    @Param('id') jobId: string,
    @Body() dto: ReviewJobDto
  ): Promise<ApiResponseDto> {
    const data = await this.adminService.reviewJob(userId, jobId, dto);
    return ApiResponseDto.success(data, `Đã ${dto.status === 'ACTIVE' ? 'duyệt' : 'từ chối'} tin tuyển dụng`);
  }

  @Get('users')
  @ApiOperation({ summary: 'Xem toàn bộ danh sách người dùng' })
  @ApiResponse({ status: 200 })
  async getAllUsers(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    const data = await this.adminService.getAllUsers(userId);
    return ApiResponseDto.success(data, 'Lấy danh sách thành công');
  }

  @Patch('users/:id/status')
  @ApiOperation({ summary: 'Khóa hoặc mở khóa người dùng' })
  @ApiResponse({ status: 200 })
  async updateUserStatus(
    @CurrentUser('userId') adminId: string,
    @Param('id') targetUserId: string,
    @Body() dto: UpdateUserStatusDto
  ): Promise<ApiResponseDto> {
    const data = await this.adminService.updateUserStatus(adminId, targetUserId, dto);
    return ApiResponseDto.success(data, `Đã ${dto.isActive ? 'mở khóa' : 'khóa'} tài khoản`);
  }
}
