import { Metadata } from 'next';
import { ArrowLeft, MailCheck, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Khôi phục mật khẩu | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh cho bước yêu cầu đặt lại mật khẩu.',
};

const copy = {
  vi: {
    back: 'Quay lại đăng nhập',
    title: 'Quên mật khẩu',
    desc: 'Đây là giao diện tĩnh của màn hình yêu cầu đặt lại mật khẩu. Không có xử lý gửi email thật.',
    email: 'Email',
    submit: 'Gửi liên kết khôi phục',
    nextTitle: 'Gợi ý hiển thị',
    note1: 'Label rõ ràng cho email.',
    note2: 'Nút gửi đủ lớn và dễ focus.',
    note3: 'Sau khi gửi, người dùng sẽ nhìn thấy màn hình xác nhận đã nhận email.',
    backLogin: 'Quay lại đăng nhập',
  },
  en: {
    back: 'Back to log in',
    title: 'Forgot password',
    desc: 'This is the static layout for the password reset request screen. No real email sending is connected yet.',
    email: 'Email',
    submit: 'Send reset link',
    nextTitle: 'Display notes',
    note1: 'A clear label for the email field.',
    note2: 'A large, easy-to-focus send button.',
    note3: 'After sending, users would see a confirmation that the email was received.',
    backLogin: 'Back to log in',
  },
} as const;

export default async function ForgotPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/login' },
        { label: 'Forgot password' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Tài khoản', href: '/login' },
        { label: 'Quên mật khẩu' },
      ];

  return (
    <main id="main-content" className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full">
        <PageBreadcrumb items={crumbs} />
        <Link href="/login" className="gov-link mb-6 inline-flex items-center gap-2 text-sm font-medium">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {t.back}
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <Card className="border-none shadow-xl sm:border">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MailCheck className="h-7 w-7" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">{t.title}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label htmlFor="reset-email" className="text-sm font-medium">
                    {t.email}
                  </label>
                  <input
                    id="reset-email"
                    type="email"
                    autoComplete="email"
                    defaultValue="user@example.com"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

                <button type="button" className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  {t.submit}
                </button>
              </form>
            </CardContent>
            <CardFooter className="border-t p-6">
              <p className="text-sm text-muted-foreground">
                {t.note3}
              </p>
            </CardFooter>
          </Card>

          <Card className="border-none bg-muted/40 shadow-none sm:border">
            <CardHeader>
              <CardTitle className="text-xl">{t.nextTitle}</CardTitle>
              <CardDescription>{locale === 'en' ? 'Supporting content to lock the UI first.' : 'Khối nội dung phụ trợ để chốt UI trước.'}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="rounded-2xl border bg-background p-4">
                <p className="font-medium text-foreground">{locale === 'en' ? 'Should include:' : 'Nên có:'}</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {t.note1}
                  </li>
                  <li className="flex gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {t.note2}
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <p className="font-medium text-foreground">{locale === 'en' ? 'After sending:' : 'Trạng thái sau gửi:'}</p>
                <p className="mt-2">{locale === 'en' ? 'Show a confirmation card and a button to return to log in.' : 'Hiển thị card xác nhận đã gửi email, có nút quay lại đăng nhập.'}</p>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6">
              <Link href="/login" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-lg' })}>
                {t.backLogin}
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
