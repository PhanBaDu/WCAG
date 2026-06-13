import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import {
  clearDemoSession,
  createDemoUser,
  DEMO_ACCESS_TOKEN,
  isDemoSession,
  readDemoUser,
  saveDemoSession,
} from '@/lib/auth/demo-session';
import { redirectToLogin } from '@/lib/auth/redirect-to-login';
import { useRouter } from '@/i18n/routing';
import type { AuthResponse, PublicUser } from '@/lib/types/auth';

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  password: string;
  role: 'NKT' | 'NTD';
  fullName?: string;
  companyName?: string;
};

type ResetPasswordPayload = {
  token: string;
  newPassword: string;
};

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

export function useAuthQuery() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async (): Promise<PublicUser | null> => {
      if (typeof window === 'undefined') {
        return null;
      }

      const token = localStorage.getItem('accessToken');
      if (!token) {
        return null;
      }

      if (token === DEMO_ACCESS_TOKEN) {
        return readDemoUser();
      }

      const { data } = await api.get<PublicUser>('/auth/me');
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
}

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const user = createDemoUser({ email: credentials.email });
      return { accessToken: DEMO_ACCESS_TOKEN, user };
    },
    onSuccess: (data: AuthResponse) => {
      saveDemoSession(data.user);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
}

export function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterPayload): Promise<AuthResponse> => {
      const user = createDemoUser({
        email: userData.email,
        role: userData.role,
        fullName: userData.fullName,
        companyName: userData.companyName,
      });
      return { accessToken: DEMO_ACCESS_TOKEN, user };
    },
    onSuccess: (data: AuthResponse) => {
      saveDemoSession(data.user);
      queryClient.setQueryData(authKeys.user(), data.user);
    },
  });
}

export function useLogoutMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      if (!isDemoSession()) {
        await api.delete('/auth/logout');
      }
    },
    onSuccess: () => {
      clearDemoSession();
      queryClient.setQueryData(authKeys.user(), null);
      queryClient.clear();
      router.push('/login');
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post('/auth/forgot-password', { email });
      return data;
    },
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload): Promise<unknown> => {
      const { data } = await api.post('/auth/reset-password', payload);
      return data;
    },
  });
}
