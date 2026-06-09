/**
 * @file        src/employer/employer.module.ts
 * @description Employer Module
 * @module      EmployerModule
 */

import { Module } from '@nestjs/common';
import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';

@Module({
  controllers: [EmployerController],
  providers: [EmployerService],
  exports: [EmployerService],
})
export class EmployerModule {}
