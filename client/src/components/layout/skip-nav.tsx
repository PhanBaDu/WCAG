 "use client";

import { useLocale } from 'next-intl';

export function SkipNav() {
  const locale = useLocale();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lg focus:outline focus:outline-2 focus:outline-white focus:outline-offset-2"
    >
      {locale === 'en' ? 'Skip to main content' : 'Bỏ qua đến nội dung chính'}
    </a>
  );
}
