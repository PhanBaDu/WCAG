/**
 * @file        src/nkt-profile/nkt-profile.module.ts
 * @description NKT Profile Module
 * @module      NktProfileModule
 */

import { Module } from '@nestjs/common';
import { NktProfileController } from './nkt-profile.controller';
import { NktProfileService } from './nkt-profile.service';

@Module({
  controllers: [NktProfileController],
  providers: [NktProfileService],
  exports: [NktProfileService],
})
export class NktProfileModule {}
