/**
 * @file        src/upload/upload.module.ts
 * @description Upload module for handling local file storage
 * @module      UploadModule
 */

import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
