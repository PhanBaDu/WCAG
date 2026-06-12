import { Metadata } from 'next';
import { ArrowLeft, BadgeCheck, Building2, EyeOff, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Đăng nhập | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh màn hình đăng nhập theo rules WCAG 2.2 AA.',
};

const copy = {
  vi: {
    title: 'Đăng nhập',
    desc: 'Chỉ hiển thị giao diện form, chưa xử lý submit.',
    back: 'Quay lại trang chủ',
    email: 'Email',
    password: 'Mật khẩu',
    forgot: 'Quên mật khẩu?',
    login: 'Đăng nhập',
    registerNote: 'Chưa có tài khoản?',
    register: 'Đăng ký ngay',
    browse: 'Xem việc làm trước',
    hintsTitle: 'Gợi ý tiếp cận',
    hint1: 'Mỗi field có label rõ ràng.',
    hint2: 'Password hiển thị bằng kiểu input chuẩn.',
    asideTitle: 'Khu vực đăng nhập',
    asideHeading: 'Giao diện đăng nhập đơn giản, rõ ràng và dễ tiếp cận',
    asideDesc: 'Đây là bản static để chốt bố cục form, nhắc lại quy tắc nhập liệu và hiển thị thông báo hỗ trợ trước khi nối dữ liệu thật.',
    quote: 'Thiết kế tối giản giúp người dùng đọc nhanh, tab nhanh và hiểu ngay luồng xác thực.',
  },
  en: {
    title: 'Log in',
    desc: 'Static form layout only, no submit logic yet.',
    back: 'Back to home',
    email: 'Email',
    password: 'Password',
    forgot: 'Forgot password?',
    login: 'Log in',
    registerNote: "Don't have an account?",
    register: 'Create one now',
    browse: 'Browse jobs first',
    hintsTitle: 'Accessibility notes',
    hint1: 'Each field has a clear label.',
    hint2: 'Password uses a standard input type.',
    asideTitle: 'Login area',
    asideHeading: 'A simple, clear, and accessible login screen',
    asideDesc: 'This static version helps lock the form layout, input order, and support messaging before wiring real data.',
    quote: 'A minimal design helps people read quickly, tab quickly, and understand the authentication flow immediately.',
  },
} as const;

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  return (
    <main id="main-content" className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="h-6 w-6" aria-hidden="true" />
          AccessJobs
        </div>
        <div className="max-w-md space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground/80">
            {t.asideTitle}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            {t.asideHeading}
          </h1>
          <p className="text-base leading-relaxed text-primary-foreground/90">
            {t.asideDesc}
          </p>
        </div>
        <div className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur">
          <p className="text-sm leading-relaxed">
            “{t.quote}”
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.back}
          </Link>

          <Card className="border-none shadow-xl sm:border">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShieldCheck className="h-7 w-7" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">{t.title}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    defaultValue="user@example.com"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-4">
                    <label htmlFor="password" className="text-sm font-medium">
                      {t.password}
                    </label>
                    <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                      {t.forgot}
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    defaultValue="••••••••"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

                <div className="rounded-2xl border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{t.hintsTitle}</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {t.hint1}
                    </li>
                    <li className="flex gap-2">
                      <EyeOff className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {t.hint2}
                    </li>
                  </ul>
                </div>

                <button type="button" className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  {t.login}
                </button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t p-6">
              <p className="text-center text-sm text-muted-foreground">
                {t.registerNote}{' '}
                <Link href="/register" className="font-semibold text-primary hover:underline">
                  {t.register}
                </Link>
              </p>
              <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-lg' })}>
                {t.browse}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
