/**
 * @file        src/hooks/use-employer-jobs.ts
 * @description Hooks for employer job management (Create, Update, Delete).
 * @module      Hooks/Employer
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        N/A
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

export function useCreateJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobData: any) => {
      const { data } = await api.post('/jobs', jobData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
    },
  });
}

export function useEmployerJobsQuery() {
  return useQuery({
    queryKey: ['employer-jobs'],
    queryFn: async () => {
      // Mock Data for now
      return [
        {
          id: '1',
          title: 'Lập trình viên ReactJS cho NKT Tứ Chi',
          status: 'APPROVED',
          applicationsCount: 12,
          expiresAt: new Date(Date.now() + 864000000).toISOString(),
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Nhân viên trực tổng đài (Remote)',
          status: 'PENDING',
          applicationsCount: 0,
          expiresAt: new Date(Date.now() + 864000000).toISOString(),
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Thiết kế đồ họa (Hỗ trợ người khiếm thính)',
          status: 'CLOSED',
          applicationsCount: 5,
          expiresAt: new Date(Date.now() - 864000000).toISOString(),
          createdAt: new Date(Date.now() - 1564000000).toISOString(),
        }
      ];
      // const { data } = await api.get('/employer/jobs');
      // return data.data;
    },
  });
}

export function useDeleteJobMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      // await api.delete(`/jobs/${jobId}`);
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
    },
  });
}

export function useUpdateJobStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ jobId, status }: { jobId: string, status: string }) => {
      // await api.patch(`/jobs/${jobId}/status`, { status });
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employer-jobs'] });
    },
  });
}
