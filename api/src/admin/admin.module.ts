/**
 * @file        src/admin/admin.module.ts
 * @description Admin Module
 * @module      AdminModule
 */

import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
