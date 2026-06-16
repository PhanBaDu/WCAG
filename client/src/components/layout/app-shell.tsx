'use client';

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { useChromeMode } from '@/components/layout/chrome-mode';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { FocusLoop } from '@/components/layout/focus-loop';

const AUTH_PATHS = new Set(['/login', '/register']);

function isAuthRoute(pathname: string) {
  return AUTH_PATHS.has(pathname);
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const { mode } = useChromeMode();
  const minimalChrome = isAuthRoute(pathname) || mode === 'minimal';
  const hideHeaderOnLanding = pathname === '/' || pathname === `/${locale}` || pathname === `/${locale}/`;

  if (minimalChrome) {
    return (
      <div
        data-app-shell="true"
        className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20"
      >
        <FocusLoop />
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
      <FocusLoop />
      {!hideHeaderOnLanding ? <Header /> : null}
      <main id="main-content" tabIndex={-1} className="w-full flex-1 outline-none">
        {children}
      </main>
      <Footer />
    </div>
  );
}
