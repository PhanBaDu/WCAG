import type { PublicUser, UserRole } from '@/lib/types/auth';

export type { PublicUser, UserRole, AuthResponse } from '@/lib/types/auth';

export type StoredUser = {
  id: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  fullName?: string;
  companyName?: string;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  lastLoginAt?: string;
};

export type StoredSession = {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  createdAt: string;
};
