/**
 * @file        src/categories/categories.controller.ts
 * @description Categories Controller
 * @module      CategoriesModule
 */

import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách tất cả ngành nghề' })
  async findAll(): Promise<ApiResponseDto> {
    const data = await this.categoriesService.findAll();
    return ApiResponseDto.success(data, 'Lấy danh mục thành công');
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Thêm danh mục mới (Chỉ Admin)' })
  async create(@CurrentUser('userId') userId: string, @Body() dto: CreateCategoryDto): Promise<ApiResponseDto> {
    const data = await this.categoriesService.create(userId, dto);
    return ApiResponseDto.success(data, 'Thêm danh mục thành công');
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
    return ApiResponseDto.success(data, 'Cập nhật danh mục thành công');
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa danh mục (Chỉ Admin)' })
  async remove(@CurrentUser('userId') userId: string, @Param('id') id: string): Promise<ApiResponseDto> {
    await this.categoriesService.remove(userId, id);
    return ApiResponseDto.success(null, 'Xóa danh mục thành công');
  }
}
