import { useLocale } from 'next-intl';
import { LangToggle } from '@/components/lang-toggle';
import { GovButtonLink } from '@/components/ui/gov-button';
import { TextNavigationLink } from '@/components/ui/text-navigation-link';
import { SiteBrand } from '@/components/layout/site-brand';

export function Header() {
  const locale = useLocale();
  const isEn = locale === 'en';
  const nav = isEn
    ? {
        home: 'Home',
        jobs: 'Jobs',
        employers: 'Employers',
        profile: 'Profile',
        login: 'Log in',
        register: 'Register',
      }
    : {
        home: 'Trang chủ',
        jobs: 'Việc làm',
        employers: 'Nhà tuyển dụng',
        profile: 'Hồ sơ',
        login: 'Đăng nhập',
        register: 'Đăng ký',
      };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6 lg:px-8">
        <SiteBrand className="justify-self-start" />

        <nav className="hidden md:flex items-center justify-self-center gap-6 text-sm font-medium" aria-label={isEn ? 'Primary navigation' : 'Điều hướng chính'}>
          <TextNavigationLink href="/">
            {nav.home}
          </TextNavigationLink>
          <TextNavigationLink href="/jobs">
            {nav.jobs}
          </TextNavigationLink>
          <TextNavigationLink href="/employer/jobs/create">
            {nav.employers}
          </TextNavigationLink>
          <TextNavigationLink href="/profile">
            {nav.profile}
          </TextNavigationLink>
        </nav>

        <div className="flex items-center justify-self-end gap-3">
          <LangToggle />
          <div className="hidden sm:flex items-center gap-2">
            <GovButtonLink href="/login" size="sm" className="px-4">
              {nav.login}
            </GovButtonLink>
            <GovButtonLink href="/register" size="sm" variant="default" className="px-4">
              {nav.register}
            </GovButtonLink>
          </div>
        </div>
      </div>
    </header>
  );
}
