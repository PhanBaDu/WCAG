/**
 * @file        src/hooks/use-profile.ts
 * @description TanStack Query hooks for fetching and updating NKT Profile.
 * @module      Hooks/Profile
 *
 * @author      Antigravity
 * @created     2026-06-10
 * @updated     2026-06-10
 *
 * @wcag        N/A
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { DisabilityType } from '@/lib/types';

export interface NKTProfile {
  id?: string;
  fullName: string;
  phone: string;
  dateOfBirth: string;
  province: string;
  summary: string;
  skills: string[];
  disabilityTypes: DisabilityType[];
  supportNeeds: string;
  expectedSalaryMin?: number;
  expectedSalaryMax?: number;
}

export const profileKeys = {
  all: ['profile'] as const,
  nkt: () => [...profileKeys.all, 'nkt'] as const,
};

export function useNKTProfileQuery() {
  return useQuery({
    queryKey: profileKeys.nkt(),
    queryFn: async (): Promise<NKTProfile> => {
      const { data } = await api.get('/nkt-profile/me');
      return data;
    },
    // Don't retry on 401/404, just return null or throw
    retry: false,
  });
}

export function useUpdateNKTProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileData: Partial<NKTProfile>) => {
      const { data } = await api.patch('/nkt-profile', profileData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKeys.nkt() });
    },
  });
}
