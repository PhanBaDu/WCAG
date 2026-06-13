import { getPathname, routing } from '@/i18n/routing';

function getCurrentLocale(): (typeof routing.locales)[number] {
  if (typeof window === 'undefined') {
    return routing.defaultLocale;
  }

  const match = window.location.pathname.match(/^\/(vi|en)(?=\/|$)/);
  return (match?.[1] as (typeof routing.locales)[number] | undefined) ?? routing.defaultLocale;
}

export function getLoginHref() {
  return getPathname({ locale: getCurrentLocale(), href: '/login' });
}

export function redirectToLogin() {
  window.location.assign(getLoginHref());
}
