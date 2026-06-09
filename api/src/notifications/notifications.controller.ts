/**
 * @file        src/notifications/notifications.controller.ts
 * @description Notifications HTTP endpoints
 * @module      NotificationsModule
 */

import { Controller, Get, Patch, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { NotificationsService } from './notifications.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách thông báo của người dùng' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200 })
  async getNotifications(
    @CurrentUser('userId') userId: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ): Promise<ApiResponseDto> {
    const p = page ? parseInt(page, 10) : 1;
    const l = limit ? parseInt(limit, 10) : 20;
    
    const result = await this.notificationsService.getUserNotifications(userId, p, l);
    return ApiResponseDto.success(result, this.i18n.t('messages.notification.FETCH_SUCCESS'));
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Đánh dấu tất cả thông báo là đã đọc' })
  @ApiResponse({ status: 200 })
  async markAllAsRead(@CurrentUser('userId') userId: string): Promise<ApiResponseDto> {
    await this.notificationsService.markAllAsRead(userId);
    return ApiResponseDto.success(null, this.i18n.t('messages.notification.MARK_ALL_READ'));
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Đánh dấu 1 thông báo là đã đọc' })
  @ApiResponse({ status: 200 })
  async markAsRead(
    @CurrentUser('userId') userId: string,
    @Param('id') notificationId: string
  ): Promise<ApiResponseDto> {
    const data = await this.notificationsService.markAsRead(userId, notificationId);
    return ApiResponseDto.success(data, this.i18n.t('messages.notification.MARK_READ'));
  }
}
