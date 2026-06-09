/**
 * @file        src/notifications/notifications.module.ts
 * @description Notifications Module
 * @module      NotificationsModule
 */

import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
