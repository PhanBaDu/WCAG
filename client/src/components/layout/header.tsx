"use client";

import { useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { useCompactHeader } from '@/hooks/use-compact-header';
import { useAuthQuery } from '@/hooks/use-auth';
import { HeaderNavMenu } from '@/components/layout/header-nav-menu';
import { HeaderAuthActions } from '@/components/layout/header-auth-actions';
import { TextNavigationLink } from '@/components/ui/text-navigation-link';
import { SiteBrand } from '@/components/layout/site-brand';

export function Header() {
  const locale = useLocale();
  const pathname = usePathname();
  const { data: user } = useAuthQuery();
  const isEn = locale === 'en';
  const isEmployer = user?.role === 'NTD';
  const isJobSeeker = user?.role === 'NKT';
  const nav = isEn
    ? {
        jobs: 'Jobs',
        appliedJobs: 'Applied jobs',
        employers: 'Employers',
        profile: 'Profile',
        login: 'Log in',
        register: 'Register',
        logout: 'Log out',
        menu: 'Open menu',
        menuTitle: 'Menu',
        closeMenu: 'Close menu',
        primaryNav: 'Primary navigation',
      }
    : {
        jobs: 'Việc làm',
        appliedJobs: 'Việc làm đã ứng tuyển',
        employers: 'Nhà tuyển dụng',
        profile: 'Hồ sơ',
        login: 'Đăng nhập',
        register: 'Đăng ký',
        logout: 'Đăng xuất',
        menu: 'Mở danh mục',
        menuTitle: 'Danh mục',
        closeMenu: 'Đóng danh mục',
        primaryNav: 'Điều hướng chính',
      };

  const { containerRef, measureRef, compact } = useCompactHeader([locale]);

  const isCurrent = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const navLinks = (
    <>
      {(!user || isJobSeeker) && (
        <>
          <TextNavigationLink href="/jobs" current={isCurrent('/jobs')} className="shrink-0 whitespace-nowrap">
            {nav.jobs}
          </TextNavigationLink>
          <TextNavigationLink
            href="/profile/applied-jobs"
            current={isCurrent('/profile/applied-jobs')}
            className="shrink-0 whitespace-nowrap"
          >
            {nav.appliedJobs}
          </TextNavigationLink>
        </>
      )}
      {(!user || isEmployer) && (
        <TextNavigationLink
          href="/employer/jobs/create"
          current={isCurrent('/employer/jobs/create')}
          className="shrink-0 whitespace-nowrap"
        >
          {nav.employers}
        </TextNavigationLink>
      )}
      <TextNavigationLink href="/profile" current={isCurrent('/profile')} className="shrink-0 whitespace-nowrap">
        {nav.profile}
      </TextNavigationLink>
    </>
  );

  const authActions = (
    <HeaderAuthActions
      loginLabel={nav.login}
      registerLabel={nav.register}
      logoutLabel={nav.logout}
      profileLabel={nav.profile}
    />
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
          className="pointer-events-none invisible absolute top-0 left-0 flex h-16 w-max max-w-none items-center gap-6 whitespace-nowrap"
        >
          <SiteBrand className="shrink-0" />
          <nav className="flex shrink-0 items-center gap-6">{navLinks}</nav>
          <div className="flex shrink-0 items-center gap-2">{authActions}</div>
        </div>

        <SiteBrand className="shrink-0" />

        {!compact && (
          <nav
            className="flex shrink-0 items-center justify-center gap-6 text-sm font-medium xl:gap-8"
            aria-label={nav.primaryNav}
          >
            {navLinks}
          </nav>
        )}

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!compact && authActions}
          {compact && (
            <HeaderNavMenu labels={nav} isCurrent={isCurrent} userRole={user?.role} />
          )}
        </div>
      </div>
    </header>
  );
}
