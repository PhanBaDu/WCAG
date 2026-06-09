/**
 * @file        src/hooks/use-jobs.ts
 * @description Provides TanStack Query hooks for fetching and managing jobs.
 * @module      Hooks/Jobs
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        N/A
 */

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Job, JobSearchFilters, PaginatedResponse } from '@/lib/types';

export const jobKeys = {
  all: ['jobs'] as const,
  lists: () => [...jobKeys.all, 'list'] as const,
  list: (filters: JobSearchFilters) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, 'detail'] as const,
  detail: (slug: string) => [...jobKeys.details(), slug] as const,
};

export function useJobsQuery(filters: JobSearchFilters) {
  return useQuery({
    queryKey: jobKeys.list(filters),
    queryFn: async (): Promise<PaginatedResponse<Job>> => {
      const { data } = await api.get('/jobs', { params: filters });
      return data;
    },
    // Keep previous data while fetching new pages/filters for better UX
    placeholderData: (previousData) => previousData,
  });
}

export function useJobDetailQuery(slug: string) {
  return useQuery({
    queryKey: jobKeys.detail(slug),
    queryFn: async (): Promise<Job> => {
      const { data } = await api.get(`/jobs/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}
