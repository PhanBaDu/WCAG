import type { UserRole } from '@/lib/types/auth';

export type DemoAccount = {
  role: UserRole;
  label: string;
  email: string;
  password: string;
  fullName: string;
  companyName?: string;
  loginHint: string;
  landingPath: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    role: 'NKT',
    label: 'Người xin việc',
    email: 'example@gmail.com',
    password: 'Demo1234!',
    fullName: 'Nguyễn Minh Anh',
    loginHint: 'Dẫn về việc làm và hồ sơ cá nhân.',
    landingPath: '/jobs',
  },
  {
    role: 'NTD',
    label: 'Nhà tuyển dụng',
    email: 'employer@example.com',
    password: 'Demo1234!',
    fullName: 'AccessJobs HR',
    companyName: 'AccessJobs HR',
    loginHint: 'Dẫn về dashboard và đăng tin tuyển dụng.',
    landingPath: '/employer/dashboard',
  },
] as const;

export const DEMO_LOGIN_EMAIL = DEMO_ACCOUNTS[0].email;
export const DEMO_LOGIN_PASSWORD = DEMO_ACCOUNTS[0].password;

export function getDemoAccountByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();
  return DEMO_ACCOUNTS.find((account) => account.email.toLowerCase() === normalizedEmail) ?? DEMO_ACCOUNTS[0];
}

export function getDemoAccountByRole(role: UserRole) {
  return DEMO_ACCOUNTS.find((account) => account.role === role) ?? DEMO_ACCOUNTS[0];
}
