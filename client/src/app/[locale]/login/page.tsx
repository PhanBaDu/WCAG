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
    titleNKT: 'Đăng nhập người tìm việc',
    descNKT: 'Truy cập hồ sơ, theo dõi đơn ứng tuyển và tiếp tục hành trình tìm việc.',
    titleNTD: 'Đăng nhập nhà tuyển dụng',
    descNTD: 'Truy cập dashboard để quản lý tin đăng và theo dõi ứng viên.',
    back: 'Quay lại trang chủ',
    email: 'Email',
    password: 'Mật khẩu',
    forgot: 'Quên mật khẩu?',
    login: 'Đăng nhập',
    loggingIn: 'Đang đăng nhập…',
    registerNoteNKT: 'Chưa có tài khoản?',
    registerNKT: 'Đăng ký ngay',
    registerNoteNTD: 'Chưa có tài khoản nhà tuyển dụng?',
    registerNTD: 'Tạo tài khoản',
    browseNKT: 'Xem việc làm trước',
    browseNTD: 'Tìm việc',
    switchLoginNKT: 'Đăng nhập nhà tuyển dụng',
    switchLoginNTD: 'Đăng nhập người tìm việc',
    benefitsTitle: 'Sau khi đăng nhập, bạn có thể',
    benefit1NKT: 'Cập nhật hồ sơ và ứng tuyển nhanh hơn.',
    benefit2NKT: 'Theo dõi tin đã nộp và trạng thái phản hồi.',
    benefit1NTD: 'Quản lý tin tuyển dụng và theo dõi ứng viên.',
    benefit2NTD: 'Truy cập dashboard và xử lý hồ sơ nhanh hơn.',
    roleLabel: 'Dành cho',
    roleNKT: 'Người tìm việc',
    roleNTD: 'Nhà tuyển dụng',
    asideTitle: 'AccessJobs VN',
    asideHeadingNKT: 'Chào mừng bạn quay lại',
    asideDescNKT: 'Đăng nhập để xem việc làm, cập nhật hồ sơ và tiếp tục ứng tuyển.',
    asideHeadingNTD: 'Chào mừng nhà tuyển dụng quay lại',
    asideDescNTD: 'Đăng nhập để quản lý dashboard, đăng tin và theo dõi ứng viên.',
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
    titleNKT: 'Log in as a job seeker',
    descNKT: 'Access your profile, track applications, and continue your job search.',
    titleNTD: 'Log in as an employer',
    descNTD: 'Access your dashboard to manage postings and review candidates.',
    back: 'Back to home',
    email: 'Email',
    password: 'Password',
    forgot: 'Forgot password?',
    login: 'Log in',
    loggingIn: 'Signing in…',
    registerNoteNKT: "Don't have an account?",
    registerNKT: 'Create one now',
    registerNoteNTD: 'No employer account yet?',
    registerNTD: 'Create one',
    browseNKT: 'Browse jobs first',
    browseNTD: 'Find jobs',
    switchLoginNKT: 'Employer sign-in',
    switchLoginNTD: 'Job seeker sign-in',
    benefitsTitle: 'Once you are signed in, you can',
    benefit1NKT: 'Update your profile and apply faster.',
    benefit2NKT: 'Track submitted applications and responses.',
    benefit1NTD: 'Manage job posts and review candidates.',
    benefit2NTD: 'Access your dashboard and handle applications faster.',
    roleLabel: 'For',
    roleNKT: 'Job seeker',
    roleNTD: 'Employer',
    asideTitle: 'AccessJobs VN',
    asideHeadingNKT: 'Welcome back',
    asideDescNKT: 'Sign in to browse jobs, update your profile, and keep applying.',
    asideHeadingNTD: 'Welcome back, employer',
    asideDescNTD: 'Sign in to manage your dashboard, publish jobs, and review candidates.',
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

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ role?: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const resolvedSearchParams = (await searchParams) ?? {};
  const role = resolvedSearchParams.role === 'NTD' ? 'NTD' : 'NKT';
  const title = role === 'NTD' ? t.titleNTD : t.titleNKT;
  const desc = role === 'NTD' ? t.descNTD : t.descNKT;
  const asideHeading = role === 'NTD' ? t.asideHeadingNTD : t.asideHeadingNKT;
  const asideDesc = role === 'NTD' ? t.asideDescNTD : t.asideDescNKT;
  const benefit1 = role === 'NTD' ? t.benefit1NTD : t.benefit1NKT;
  const benefit2 = role === 'NTD' ? t.benefit2NTD : t.benefit2NKT;
  const roleLabel = role === 'NTD' ? t.roleNTD : t.roleNKT;
  const registerNote = role === 'NTD' ? t.registerNoteNTD : t.registerNoteNKT;
  const registerText = role === 'NTD' ? t.registerNTD : t.registerNKT;
  const browseText = role === 'NTD' ? t.browseNTD : t.browseNKT;
  const switchLoginText = role === 'NTD' ? t.switchLoginNTD : t.switchLoginNKT;
  const switchLoginHref = role === 'NTD' ? '/login' : '/login?role=NTD';
  const loginLabels = {
    ...t,
    benefit1,
    benefit2,
  };
  return (
    <main id="main-content" tabIndex={-1} className="grid min-h-screen outline-none lg:grid-cols-2">
      <div className="hidden bg-black p-10 text-white lg:flex lg:flex-col">
        <SiteBrand tone="inverse" className="border-white/20" />
        <div className="mt-16 max-w-xl space-y-4">
          <p className="text-sm font-medium text-white/70">{t.asideTitle}</p>
          <h1 className="text-4xl font-bold tracking-tight">{asideHeading}</h1>
          <p className="text-base leading-relaxed text-white/85">{asideDesc}</p>
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.roleLabel}: {roleLabel}
              </p>
              <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<p className="text-sm text-muted-foreground">{t.loggingIn}</p>}>
                <LoginForm labels={loginLabels} />
              </Suspense>
            </CardContent>
            <CardFooter className="mx-6 mb-6 flex flex-col gap-3 rounded-xl border-t-0 bg-muted/50 p-6">
              <p className="text-center text-sm text-muted-foreground">
                {registerNote}{' '}
                <Link href={role === 'NTD' ? '/register?role=NTD' : '/register'} className="gov-link font-semibold">
                  {registerText}
                </Link>
              </p>
              <Link
                href={role === 'NTD' ? '/employer/dashboard' : '/jobs'}
                className={buttonVariants({ variant: 'outline', className: 'h-11 w-full' })}
              >
                {browseText}
              </Link>
              <Link
                href={switchLoginHref}
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'h-11 w-full rounded-none border-[#0b0c0c] bg-white text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00]',
                })}
              >
                {switchLoginText}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
