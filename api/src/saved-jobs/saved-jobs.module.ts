/**
 * @file        src/saved-jobs/saved-jobs.module.ts
 * @description Saved Jobs Module
 * @module      SavedJobsModule
 */

import { Module } from '@nestjs/common';
import { SavedJobsController } from './saved-jobs.controller';
import { SavedJobsService } from './saved-jobs.service';

@Module({
  controllers: [SavedJobsController],
  providers: [SavedJobsService],
  exports: [SavedJobsService],
})
export class SavedJobsModule {}
