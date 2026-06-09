/**
 * @file        src/categories/categories.controller.ts
 * @description Categories Controller
 * @module      CategoriesModule
 */

import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { I18nService } from 'nestjs-i18n';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly i18n: I18nService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả ngành nghề' })
  async findAll(): Promise<ApiResponseDto> {
    const data = await this.categoriesService.findAll();
    return ApiResponseDto.success(data, this.i18n.t('messages.category.FETCH_SUCCESS'));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm danh mục mới (Chỉ Admin)' })
  async create(@CurrentUser('userId') userId: string, @Body() dto: CreateCategoryDto): Promise<ApiResponseDto> {
    const data = await this.categoriesService.create(userId, dto);
    return ApiResponseDto.success(data, this.i18n.t('messages.category.CREATE_SUCCESS'));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sửa danh mục (Chỉ Admin)' })
  async update(
    @CurrentUser('userId') userId: string,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto
  ): Promise<ApiResponseDto> {
    const data = await this.categoriesService.update(userId, id, dto);
    return ApiResponseDto.success(data, this.i18n.t('messages.category.UPDATE_SUCCESS'));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa danh mục (Chỉ Admin)' })
  async remove(@CurrentUser('userId') userId: string, @Param('id') id: string): Promise<ApiResponseDto> {
    await this.categoriesService.remove(userId, id);
    return ApiResponseDto.success(null, this.i18n.t('messages.category.DELETE_SUCCESS'));
  }
}
