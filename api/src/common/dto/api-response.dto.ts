/**
 * @file        src/common/dto/api-response.dto.ts
 * @description Standard API response envelope for all endpoints
 * @module      Common
 *
 * @author      AI
 * @created     2024-05-20
 * @updated     2024-05-20
 *
 * @wcag        N/A
 */

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponseDto<T = unknown> {
  success: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string[]>;
  meta?: PaginationMeta;

  static success<T>(data: T, message = 'Success'): ApiResponseDto<T> {
    return { success: true, message, data, errors: undefined };
  }

  static error(message: string, errors?: Record<string, string[]>): ApiResponseDto<null> {
    return { success: false, message, data: null, errors };
  }

  static paginated<T>(data: T[], meta: PaginationMeta, message = 'Success'): ApiResponseDto<T[]> {
    return { success: true, message, data, meta };
  }
}
