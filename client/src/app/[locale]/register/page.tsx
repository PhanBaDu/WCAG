import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { AuthAsideLottie } from '@/components/auth/auth-aside-lottie';
import { RegisterForm } from '@/components/auth/register-form';
import { SiteBrand } from '@/components/layout/site-brand';

export const metadata: Metadata = {
  title: 'Đăng ký | AccessJobs VN',
  description: 'Tạo tài khoản AccessJobs VN để tìm việc hoặc đăng tin tuyển dụng.',
};

const copy = {
  vi: {
    titleNKT: 'Tạo tài khoản người tìm việc',
    descNKT: 'Tham gia miễn phí để tìm việc phù hợp trên AccessJobs VN.',
    titleNTD: 'Tạo tài khoản nhà tuyển dụng',
    descNTD: 'Tham gia miễn phí để tiếp cận ứng viên và đăng tin tuyển dụng.',
    back: 'Quay lại trang chủ',
    asideTitle: 'AccessJobs VN',
    asideHeadingNKT: 'Gia nhập AccessJobs VN',
    asideDescNKT: 'Miễn phí cho người tìm việc. Chỉ mất vài phút để bắt đầu.',
    asideHeadingNTD: 'Gia nhập AccessJobs VN với tư cách nhà tuyển dụng',
    asideDescNTD: 'Tạo tài khoản để đăng tin và quản lý ứng viên ngay trong dashboard.',
    role: 'Bạn đăng ký với tư cách',
    roleNKT: 'Người tìm việc',
    roleNTD: 'Nhà tuyển dụng',
    name: 'Họ và tên / Tên công ty',
    email: 'Email',
    password: 'Mật khẩu',
    confirm: 'Xác nhận mật khẩu',
    benefitsTitle: 'Tài khoản giúp bạn',
    benefit1: 'Ứng tuyển nhiều vị trí mà không cần nhập lại thông tin.',
    benefit2: 'Đăng tin và quản lý ứng viên nếu bạn tuyển dụng.',
    submit: 'Tạo tài khoản',
    submitting: 'Đang tạo tài khoản…',
    loginNote: 'Đã có tài khoản?',
    login: 'Đăng nhập',
    browse: 'Xem việc làm trước',
    switchRegisterNKT: 'Đăng ký nhà tuyển dụng',
    switchRegisterNTD: 'Đăng ký người tìm việc',
    emailRequired: 'Vui lòng nhập email',
    emailInvalid: 'Email không hợp lệ',
    passwordRequired: 'Vui lòng nhập mật khẩu',
    passwordWeak:
      'Mật khẩu tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt (@$!%*?&).',
    confirmRequired: 'Vui lòng xác nhận mật khẩu',
    confirmMismatch: 'Mật khẩu xác nhận không khớp',
    nameRequired: 'Vui lòng nhập họ và tên hoặc tên công ty',
    formAriaLabel: 'Form đăng ký AccessJobs VN',
    required: '(bắt buộc)',
    errorSummaryTitle: 'Không thể gửi form',
    errorSummary: 'Vui lòng sửa các lỗi sau trước khi tạo tài khoản.',
    showPassword: 'Hiện mật khẩu',
    hidePassword: 'Ẩn mật khẩu',
    fieldComplete: 'Đã hoàn thành',
  },
  en: {
    titleNKT: 'Create a job seeker account',
    descNKT: 'Join for free to find suitable roles on AccessJobs VN.',
    titleNTD: 'Create an employer account',
    descNTD: 'Join for free to reach candidates and post jobs.',
    back: 'Back to home',
    asideTitle: 'AccessJobs VN',
    asideHeadingNKT: 'Join AccessJobs VN',
    asideDescNKT: 'Free for job seekers. It only takes a few minutes to get started.',
    asideHeadingNTD: 'Join AccessJobs VN as an employer',
    asideDescNTD: 'Create an account to post jobs and manage candidates in one place.',
    role: 'I am signing up as',
    roleNKT: 'Job seeker',
    roleNTD: 'Employer',
    name: 'Full name / Company name',
    email: 'Email',
    password: 'Password',
    confirm: 'Confirm password',
    benefitsTitle: 'Your account lets you',
    benefit1: 'Apply to multiple roles without re-entering your details.',
    benefit2: 'Post jobs and manage applicants if you are hiring.',
    submit: 'Create account',
    submitting: 'Creating account…',
    loginNote: 'Already have an account?',
    login: 'Log in',
    browse: 'Browse jobs first',
    switchRegisterNKT: 'Employer registration',
    switchRegisterNTD: 'Job seeker registration',
    emailRequired: 'Please enter your email',
    emailInvalid: 'Enter a valid email address',
    passwordRequired: 'Please enter a password',
    passwordWeak:
      'Password must be at least 8 characters and include upper and lower case letters, a number, and a special character (@$!%*?&).',
    confirmRequired: 'Please confirm your password',
    confirmMismatch: 'Passwords do not match',
    nameRequired: 'Please enter your full name or company name',
    formAriaLabel: 'AccessJobs VN registration form',
    required: '(required)',
    errorSummaryTitle: 'Unable to submit the form',
    errorSummary: 'Please fix the following errors before creating your account.',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    fieldComplete: 'Completed',
  },
} as const;

export default async function RegisterPage({
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
  const switchRegisterText = role === 'NTD' ? t.switchRegisterNKT : t.switchRegisterNTD;
  const switchRegisterHref = role === 'NTD' ? '/register' : '/register?role=NTD';

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
        <div className="w-full max-w-lg">
          <Link href="/" className="gov-link mb-6 inline-flex w-fit items-center gap-2 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.back}
          </Link>

          <Card className="border-none shadow-xl sm:border">
            <CardHeader className="space-y-3 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {t.role}: {role === 'NTD' ? t.roleNTD : t.roleNKT}
              </p>
              <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
              <CardDescription>{desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm labels={t} defaultRole={role} />
            </CardContent>
            <CardFooter className="mx-6 mb-6 flex flex-col gap-3 rounded-xl border-t-0 bg-muted/50 p-6">
              <p className="text-center text-sm text-muted-foreground">
                {t.loginNote}{' '}
                <Link href={role === 'NTD' ? '/login?role=NTD' : '/login'} className="gov-link font-semibold">
                  {t.login}
                </Link>
              </p>
              <Link href="/jobs" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full' })}>
                {t.browse}
              </Link>
              <Link
                href={switchRegisterHref}
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'h-11 w-full rounded-none border-[#0b0c0c] bg-white text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00]',
                })}
              >
                {switchRegisterText}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
