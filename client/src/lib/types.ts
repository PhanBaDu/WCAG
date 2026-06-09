/**
 * @file        src/lib/types.ts
 * @description Defines shared TypeScript types and interfaces for the frontend application.
 * @module      Lib/Types
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        N/A
 */

export type DisabilityType = 
  | 'MOBILITY' 
  | 'VISUAL' 
  | 'HEARING' 
  | 'SPEECH' 
  | 'COGNITIVE' 
  | 'OTHER';

export interface Job {
  id: string;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  benefits: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: 'FULL_TIME' | 'PART_TIME' | 'REMOTE' | 'HYBRID';
  disabilityTypes: DisabilityType[];
  accessibilityFeatures: string[];
  expiresAt: string;
  createdAt: string;
  employer: {
    id: string;
    companyName: string;
    logoUrl?: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface JobSearchFilters {
  q?: string;
  disabilityTypes?: DisabilityType[];
  jobTypes?: string[];
  province?: string;
  page?: number;
  limit?: number;
}
