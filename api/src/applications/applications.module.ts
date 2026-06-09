/**
 * @file        src/applications/applications.module.ts
 * @description Applications Module
 * @module      ApplicationsModule
 */

import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';
import { EmployerApplicationsController } from './employer-applications.controller';
import { ApplicationsService } from './applications.service';

@Module({
  controllers: [ApplicationsController, EmployerApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
