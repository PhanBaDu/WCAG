/**
 * @file        src/auth/auth.controller.ts
 * @description Authentication controller handling HTTP endpoints
 * @module      AuthModule
 */

import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseDto } from '../common/dto/api-response.dto';
// Note: We would normally have a custom JwtAuthGuard here, omitting for brevity of setup
// import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new account (NKT or NTD)' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async register(@Body() dto: RegisterDto): Promise<ApiResponseDto> {
    const data = await this.authService.register(dto);
    return ApiResponseDto.success(data, 'Đăng ký thành công. Vui lòng kiểm tra email để xác thực.');
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user and return tokens' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto): Promise<ApiResponseDto> {
    const data = await this.authService.login(dto);
    return ApiResponseDto.success(data, 'Đăng nhập thành công');
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Body('userId') userId: string, @Body('refreshToken') refreshToken: string): Promise<ApiResponseDto> {
    // In real app, userId comes from @CurrentUser() via JwtAuthGuard
    await this.authService.logout(userId, refreshToken);
    return ApiResponseDto.success(null, 'Đăng xuất thành công');
  }
}
