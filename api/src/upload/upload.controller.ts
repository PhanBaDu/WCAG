/**
 * @file        src/upload/upload.controller.ts
 * @description Upload controller for file uploads
 * @module      UploadModule
 */

import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UploadService, editFileName, imageFileFilter, documentFileFilter } from './upload.service';
import { ApiResponseDto } from '../common/dto/api-response.dto';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload an image file (avatar, logo)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })], // 2MB
      }),
    )
    file: Express.Multer.File,
  ) {
    const url = this.uploadService.getFileUrl(file.filename);
    return ApiResponseDto.success({ url, filename: file.filename, size: file.size, mimeType: file.mimetype }, 'Image uploaded successfully');
  }

  @Post('cv')
  @ApiOperation({ summary: 'Upload a document file (CV)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: documentFileFilter,
    }),
  )
  uploadDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })], // 5MB
      }),
    )
    file: Express.Multer.File,
  ) {
    const url = this.uploadService.getFileUrl(file.filename);
    return ApiResponseDto.success({ url, filename: file.filename, size: file.size, mimeType: file.mimetype }, 'Document uploaded successfully');
  }
}
