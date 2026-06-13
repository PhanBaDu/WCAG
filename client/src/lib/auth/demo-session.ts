import type { PublicUser, UserRole } from '@/lib/types/auth';

export const DEMO_ACCESS_TOKEN = 'demo-access-token';

export function createDemoUser(input: {
  email: string;
  role?: UserRole;
  fullName?: string;
  companyName?: string;
}): PublicUser {
  return {
    id: 'demo-user',
    email: input.email.trim().toLowerCase(),
    role: input.role ?? 'NKT',
    isVerified: true,
    fullName: input.fullName,
    companyName: input.companyName,
  };
}

export function saveDemoSession(user: PublicUser) {
  localStorage.setItem('accessToken', DEMO_ACCESS_TOKEN);
  localStorage.setItem('demoUser', JSON.stringify(user));
}

export function readDemoUser(): PublicUser | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (localStorage.getItem('accessToken') !== DEMO_ACCESS_TOKEN) {
    return null;
  }

  const raw = localStorage.getItem('demoUser');
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as PublicUser;
  } catch {
    return null;
  }
}

export function clearDemoSession() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('demoUser');
}

export function isDemoSession() {
  return typeof window !== 'undefined' && localStorage.getItem('accessToken') === DEMO_ACCESS_TOKEN;
}
