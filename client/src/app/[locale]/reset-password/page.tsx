import { Metadata } from 'next';
import { ArrowLeft, LockKeyhole, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Đặt lại mật khẩu | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh cho màn hình đặt lại mật khẩu.',
};

const copy = {
  vi: {
    back: 'Quay lại đăng nhập',
    title: 'Đặt lại mật khẩu',
    desc: 'Giao diện tĩnh của màn hình đổi mật khẩu sau khi người dùng mở liên kết từ email.',
    newPass: 'Mật khẩu mới',
    confirm: 'Xác nhận mật khẩu mới',
    submit: 'Lưu mật khẩu mới',
    noteTitle: 'Kiểm tra trước khi hoàn tất',
    note1: 'Mật khẩu mới và xác nhận phải khớp nhau.',
    note2: 'Nút lưu đủ lớn, dễ thấy và có focus ring.',
    note3: 'Nếu không có token: hiển thị thông báo và liên kết quay về đăng nhập.',
    backLogin: 'Quay lại đăng nhập',
  },
  en: {
    back: 'Back to log in',
    title: 'Reset password',
    desc: 'Static layout of the password reset screen after a user opens the email link.',
    newPass: 'New password',
    confirm: 'Confirm new password',
    submit: 'Save new password',
    noteTitle: 'Check before finishing',
    note1: 'The new password and confirmation must match.',
    note2: 'The save button should be large, visible, and focused clearly.',
    note3: 'If no token is present: show a message and a link back to log in.',
    backLogin: 'Back to log in',
  },
} as const;

export default async function ResetPasswordPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Account', href: '/login' },
        { label: 'Reset password' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Tài khoản', href: '/login' },
        { label: 'Đặt lại mật khẩu' },
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
                <LockKeyhole className="h-7 w-7" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">{t.title}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-sm font-medium">
                    {t.newPass}
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    defaultValue="••••••••"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-new-password" className="text-sm font-medium">
                    {t.confirm}
                  </label>
                  <input
                    id="confirm-new-password"
                    type="password"
                    autoComplete="new-password"
                    defaultValue="••••••••"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

                <button type="button" className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  {t.submit}
                </button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-none bg-muted/40 shadow-none sm:border">
            <CardHeader>
              <CardTitle className="text-xl">{t.noteTitle}</CardTitle>
              <CardDescription>{locale === 'en' ? 'A side column to describe accessibility and confirmation rules.' : 'Một cột phụ để mô tả quy tắc truy cập và xác nhận.'}</CardDescription>
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
                <p className="font-medium text-foreground">{locale === 'en' ? 'If no token is present:' : 'Nếu không có token:'}</p>
                <p className="mt-2">{t.note3}</p>
              </div>
            </CardContent>
            <CardContent className="px-6 pb-6">
              <Link href="/login" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-lg' })}>
                {t.backLogin}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
