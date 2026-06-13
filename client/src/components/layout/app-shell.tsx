'use client';

import { usePathname } from '@/i18n/routing';
import { useChromeMode } from '@/components/layout/chrome-mode';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

const AUTH_PATHS = new Set(['/login', '/register']);

function isAuthRoute(pathname: string) {
  return AUTH_PATHS.has(pathname);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode } = useChromeMode();
  const minimalChrome = isAuthRoute(pathname) || mode === 'minimal';

  if (minimalChrome) {
    return (
      <div
        data-app-shell="true"
        className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20"
      >
        <main id="main-content" tabIndex={-1} className="w-full flex-1 outline-none">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div
      data-app-shell="true"
      className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20"
    >
      <Header />
      <main id="main-content" tabIndex={-1} className="w-full flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
