'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useAuthQuery } from '@/hooks/use-auth';
import { useRouter } from '@/i18n/routing';

type EmployerRouteGateProps = {
  children: ReactNode;
};

export function EmployerRouteGate({ children }: EmployerRouteGateProps) {
  const router = useRouter();
  const { data: user, isLoading, isFetched } = useAuthQuery();

  useEffect(() => {
    if (!isFetched) {
      return;
    }

    if (!user) {
      router.replace('/login?role=NTD');
      return;
    }

    if (user.role !== 'NTD') {
      router.replace('/jobs');
    }
  }, [isFetched, router, user]);

  if (isLoading || !isFetched || !user || user.role !== 'NTD') {
    return (
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 outline-none"
      >
        <p className="text-sm text-muted-foreground">Đang kiểm tra quyền truy cập…</p>
      </main>
    );
  }

  return children;
}
