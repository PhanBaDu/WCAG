/**
 * @file        src/prisma/prisma.module.ts
 * @description Prisma module to export PrismaService
 * @module      PrismaModule
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
