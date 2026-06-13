"use client";

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';

function scrollToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
}

export function ScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    scrollToTop();

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        scrollToTop();
      }
    };

    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, []);

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return null;
}
