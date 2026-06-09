/**
 * @file        src/upload/upload.service.ts
 * @description Upload service for processing files locally
 * @module      UploadModule
 */

import { Injectable, BadRequestException } from '@nestjs/common';
import { extname } from 'path';

@Injectable()
export class UploadService {
  /**
   * Return the URL to access the uploaded file
   */
  getFileUrl(filename: string): string {
    // Basic local URL generation.
    // In production, you would return an S3/Cloudflare R2 URL.
    return `/uploads/${filename}`;
  }
}

/**
 * Helper to generate random file name and keep extension
 */
export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].replace(/\s+/g, '-');
  const fileExtName = extname(file.originalname);
  const randomName = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

/**
 * Image filter (PNG, JPG, WebP)
 */
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }
  callback(null, true);
};

/**
 * Document filter (PDF, DOC, DOCX)
 */
export const documentFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
    return callback(new BadRequestException('Only document files (PDF, DOC, DOCX) are allowed!'), false);
  }
  callback(null, true);
};
