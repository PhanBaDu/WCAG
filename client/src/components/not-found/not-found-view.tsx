'use client';

import { useLayoutEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { NotFoundLottie } from '@/components/not-found/not-found-lottie';
import { cn } from '@/lib/utils';

const copy = {
  vi: {
    title: 'Không tìm thấy trang',
    desc: 'Trang bạn truy cập không tồn tại hoặc đã được chuyển đi. Bạn có thể quay lại trang tìm việc để tiếp tục.',
    button: 'Về trang tìm việc',
  },
  en: {
    title: 'Page not found',
    desc: "The page you requested doesn't exist or may have moved. You can return to the job search page to continue.",
    button: 'Back to job search',
  },
} as const;

export function NotFoundView() {
  const locale = useLocale();
  const t = copy[locale === 'en' ? 'en' : 'vi'];
  const jobsLinkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    jobsLinkRef.current?.focus();
  }, []);

  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8"
    >
      <NotFoundLottie />
      <h1 id="not-found-title" className="mt-6 text-3xl font-bold tracking-tight text-foreground">
        {t.title}
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{t.desc}</p>
      <Link
        ref={jobsLinkRef}
        href="/jobs"
        className={cn(
          buttonVariants({ size: 'lg', className: 'mt-8 h-12 w-fit min-w-44 px-8' })
        )}
      >
        {t.button}
      </Link>
    </section>
  );
}
