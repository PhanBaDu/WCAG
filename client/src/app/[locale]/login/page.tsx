import { Metadata } from 'next';
import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { AuthAsideLottie } from '@/components/auth/auth-aside-lottie';
import { LoginForm } from '@/components/auth/login-form';
import { SiteBrand } from '@/components/layout/site-brand';

export const metadata: Metadata = {
  title: 'Đăng nhập | AccessJobs VN',
  description: 'Đăng nhập AccessJobs VN để quản lý hồ sơ, theo dõi ứng tuyển và tin tuyển dụng.',
};

const copy = {
  vi: {
    title: 'Đăng nhập',
    desc: 'Truy cập hồ sơ, theo dõi đơn ứng tuyển và quản lý tin tuyển dụng của bạn.',
    back: 'Quay lại trang chủ',
    email: 'Email',
    password: 'Mật khẩu',
    forgot: 'Quên mật khẩu?',
    login: 'Đăng nhập',
    loggingIn: 'Đang đăng nhập…',
    registerNote: 'Chưa có tài khoản?',
    register: 'Đăng ký ngay',
    browse: 'Xem việc làm trước',
    benefitsTitle: 'Sau khi đăng nhập, bạn có thể',
    benefit1: 'Cập nhật hồ sơ và ứng tuyển nhanh hơn.',
    benefit2: 'Theo dõi tin đã nộp hoặc tin tuyển dụng đã đăng.',
    asideTitle: 'AccessJobs VN',
    asideHeading: 'Chào mừng trở lại',
    asideDesc:
      'Đăng nhập để xem việc làm, cập nhật hồ sơ và tiếp tục ứng tuyển — dù bạn đang tìm việc hay tuyển dụng.',
    emailRequired: 'Vui lòng nhập email',
    emailInvalid: 'Email không hợp lệ',
    passwordRequired: 'Vui lòng nhập mật khẩu',
    passwordMin: 'Mật khẩu tối thiểu 8 ký tự',
    formAriaLabel: 'Form đăng nhập AccessJobs VN',
    required: '(bắt buộc)',
    errorSummaryTitle: 'Không thể gửi form',
    errorSummary: 'Vui lòng sửa các lỗi sau trước khi đăng nhập.',
    showPassword: 'Hiện mật khẩu',
    hidePassword: 'Ẩn mật khẩu',
    fieldComplete: 'Đã hoàn thành',
  },
  en: {
    title: 'Log in',
    desc: 'Access your profile, track applications, and manage your job posts.',
    back: 'Back to home',
    email: 'Email',
    password: 'Password',
    forgot: 'Forgot password?',
    login: 'Log in',
    loggingIn: 'Signing in…',
    registerNote: "Don't have an account?",
    register: 'Create one now',
    browse: 'Browse jobs first',
    benefitsTitle: 'Once you are signed in, you can',
    benefit1: 'Update your profile and apply faster.',
    benefit2: 'Track submitted applications or published job posts.',
    asideTitle: 'AccessJobs VN',
    asideHeading: 'Welcome back',
    asideDesc:
      'Sign in to browse jobs, update your profile, and continue applying — whether you are hiring or looking for work.',
    emailRequired: 'Please enter your email',
    emailInvalid: 'Enter a valid email address',
    passwordRequired: 'Please enter your password',
    passwordMin: 'Password must be at least 8 characters',
    formAriaLabel: 'AccessJobs VN sign-in form',
    required: '(required)',
    errorSummaryTitle: 'Unable to submit the form',
    errorSummary: 'Please fix the following errors before signing in.',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    fieldComplete: 'Completed',
  },
} as const;

export default async function LoginPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  return (
    <main id="main-content" tabIndex={-1} className="grid min-h-screen outline-none lg:grid-cols-2">
      <div className="hidden bg-black p-10 text-white lg:flex lg:flex-col">
        <SiteBrand tone="inverse" className="border-white/20" />
        <div className="mt-16 max-w-xl space-y-4">
          <p className="text-sm font-medium text-white/70">{t.asideTitle}</p>
          <h1 className="text-4xl font-bold tracking-tight">{t.asideHeading}</h1>
          <p className="text-base leading-relaxed text-white/85">{t.asideDesc}</p>
          <div className="pt-4">
            <AuthAsideLottie />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-10">
        <div className="w-full max-w-md">
          <Link href="/" className="gov-link mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.back}
          </Link>

          <Card className="border-none shadow-xl sm:border">
            <CardHeader className="space-y-3 text-center">
              <CardTitle className="text-2xl font-bold tracking-tight">{t.title}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p className="text-sm text-muted-foreground">{t.loggingIn}</p>}>
                <LoginForm labels={t} />
              </Suspense>
            </CardContent>
            <CardFooter className="mx-6 mb-6 flex flex-col gap-3 rounded-xl border-t-0 bg-muted/50 p-6">
              <p className="text-center text-sm text-muted-foreground">
                {t.registerNote}{' '}
                <Link href="/register" className="gov-link font-semibold">
                  {t.register}
                </Link>
              </p>
              <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full' })}>
                {t.browse}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
