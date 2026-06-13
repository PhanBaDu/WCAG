export type UserRole = 'NKT' | 'NTD' | 'ADM';

export type PublicUser = {
  id: string;
  email: string;
  role: UserRole;
  isVerified: boolean;
  fullName?: string;
  companyName?: string;
};

export type AuthResponse = {
  accessToken: string;
  user: PublicUser;
};
