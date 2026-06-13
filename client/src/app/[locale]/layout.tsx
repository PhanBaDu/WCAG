import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Providers } from '@/components/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { ChromeModeProvider } from '@/components/layout/chrome-mode';
import { AppShell } from '@/components/layout/app-shell';
import { SkipNav } from '@/components/layout/skip-nav';
import { KeyboardShortcutsDialog } from '@/components/layout/keyboard-shortcuts-dialog';
import { ScrollRestoration } from '@/components/layout/scroll-restoration';
import '../globals.css';
import { Inter, Lexend } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: true,
  adjustFontFallback: true,
});

const lexend = Lexend({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-lexend',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  preload: false,
  adjustFontFallback: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh cho cổng việc làm người khuyết tật theo chuẩn WCAG 2.2 AA.',
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${lexend.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <ThemeProvider>
              <SkipNav />
              <ChromeModeProvider>
                <AppShell>{children}</AppShell>
              </ChromeModeProvider>
              <ScrollRestoration />
              <KeyboardShortcutsDialog />
              <Toaster />
            </ThemeProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
