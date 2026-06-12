import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/axios';

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

type AuthResponse = {
  accessToken: string;
};

export const authKeys = {
  all: ['auth'] as const,
  user: () => [...authKeys.all, 'user'] as const,
};

// 1. Fetch current user
export function useAuthQuery() {
  return useQuery({
    queryKey: authKeys.user(),
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// 2. Login
export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data: AuthResponse) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.accessToken);
      }
      queryClient.invalidateQueries({ queryKey: authKeys.user() });
    },
  });
}

// 3. Register
export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (userData: RegisterPayload): Promise<unknown> => {
      const { data } = await api.post('/auth/register', userData);
      return data;
    },
  });
}

// 4. Logout
export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete('/auth/logout');
    },
    onSuccess: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
      queryClient.clear();
      window.location.href = '/login';
    },
  });
}

// 5. Forgot Password
export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post('/auth/forgot-password', { email });
      return data;
    },
  });
}

// 6. Reset Password
export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async (payload: ResetPasswordPayload): Promise<unknown> => {
      const { data } = await api.post('/auth/reset-password', payload);
      return data;
    },
  });
}
