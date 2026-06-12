import { useLocale } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Accessibility } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme-toggle';
import { LangToggle } from '@/components/lang-toggle';

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
      <div className="max-w-7xl mx-auto w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-primary">
          <Accessibility className="h-6 w-6 text-primary" aria-hidden="true" />
          <span className="font-bold tracking-tight">AccessJobs</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium" aria-label={isEn ? 'Primary navigation' : 'Điều hướng chính'}>
          <Link href="/" className="transition-colors hover:text-primary">
            {nav.home}
          </Link>
          <Link href="/jobs" className="transition-colors text-muted-foreground hover:text-primary">
            {nav.jobs}
          </Link>
          <Link href="/employer/jobs/create" className="transition-colors text-muted-foreground hover:text-primary">
            {nav.employers}
          </Link>
          <Link href="/profile" className="transition-colors text-muted-foreground hover:text-primary">
            {nav.profile}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <LangToggle />
          <ThemeToggle />
          <div className="hidden sm:flex items-center gap-2">
            <Link href="/login" className={buttonVariants({ variant: 'ghost' })}>
              {nav.login}
            </Link>
            <Link href="/register" className={buttonVariants({ variant: 'default' })}>
              {nav.register}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
