"use client";

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { useCompactHeader } from '@/hooks/use-compact-header';
import { LangToggle } from '@/components/lang-toggle';
import { HeaderNavMenu } from '@/components/layout/header-nav-menu';
import { GovButtonLink } from '@/components/ui/gov-button';
import { TextNavigationLink } from '@/components/ui/text-navigation-link';
import { SiteBrand } from '@/components/layout/site-brand';

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const isEn = locale === 'en';
  const nav = isEn
    ? {
        home: 'Home',
        jobs: 'Jobs',
        employers: 'Employers',
        profile: 'Profile',
        login: 'Log in',
        register: 'Register',
        menu: 'Open menu',
        primaryNav: 'Primary navigation',
      }
    : {
        home: 'Trang chủ',
        jobs: 'Việc làm',
        employers: 'Nhà tuyển dụng',
        profile: 'Hồ sơ',
        login: 'Đăng nhập',
        register: 'Đăng ký',
        menu: 'Mở menu',
        primaryNav: 'Điều hướng chính',
      };

  const { containerRef, measureRef, compact } = useCompactHeader([locale]);

  const isCurrent = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinks = (
    <>
      <TextNavigationLink href="/" current={isCurrent('/')} className="shrink-0 whitespace-nowrap">
        {nav.home}
      </TextNavigationLink>
      <TextNavigationLink href="/jobs" current={isCurrent('/jobs')} className="shrink-0 whitespace-nowrap">
        {nav.jobs}
      </TextNavigationLink>
      <TextNavigationLink
        href="/employer/jobs/create"
        current={isCurrent('/employer/jobs/create')}
        className="shrink-0 whitespace-nowrap"
      >
        {nav.employers}
      </TextNavigationLink>
      <TextNavigationLink href="/profile" current={isCurrent('/profile')} className="shrink-0 whitespace-nowrap">
        {nav.profile}
      </TextNavigationLink>
    </>
  );

  const authActions = (
    <>
      <LangToggle />
      <GovButtonLink href="/login" size="sm" className="shrink-0 px-4">
        {nav.login}
      </GovButtonLink>
      <GovButtonLink href="/register" size="sm" variant="default" className="shrink-0 px-4">
        {nav.register}
      </GovButtonLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div
        ref={containerRef}
        className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8"
      >
        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute top-0 left-0 flex h-16 w-max max-w-none items-center gap-3 whitespace-nowrap"
        >
          <SiteBrand className="shrink-0" />
          <nav className="flex shrink-0 items-center gap-4">{navLinks}</nav>
          <div className="flex shrink-0 items-center gap-2">{authActions}</div>
        </div>

        <SiteBrand className="shrink-0" />

        {!compact && (
          <nav
            className="flex shrink-0 items-center justify-center gap-4 text-sm font-medium xl:gap-6"
            aria-label={nav.primaryNav}
          >
            {navLinks}
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!compact && authActions}
          {compact && (
            <HeaderNavMenu labels={nav} isCurrent={isCurrent} />
          )}
        </div>
      </div>
    </header>
  );
}
