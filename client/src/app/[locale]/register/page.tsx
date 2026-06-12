import { Metadata } from 'next';
import { ArrowLeft, BadgeCheck, Building2, HeartHandshake, ShieldCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Đăng ký | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh trang đăng ký với lựa chọn vai trò NKT/NTD.',
};

const copy = {
  vi: {
    title: 'Tạo tài khoản',
    desc: 'Form static để chốt UI trước khi thêm validation và API.',
    back: 'Quay lại trang chủ',
    asideTitle: 'Tạo tài khoản',
    asideHeading: 'Một form đăng ký tĩnh để kiểm tra bố cục và thứ tự nhập liệu',
    asideDesc: 'Chọn vai trò, nhập thông tin cơ bản và xem cách các vùng nội dung được sắp xếp theo quy tắc tiếp cận.',
    quote: 'Người tìm việc và nhà tuyển dụng đều cần một biểu mẫu rõ ràng, có nhãn đầy đủ và không phụ thuộc placeholder.',
    role: 'Vai trò',
    roleNKT: 'Người khuyết tật tìm việc',
    roleNTD: 'Nhà tuyển dụng',
    name: 'Họ và tên / Tên công ty',
    email: 'Email',
    password: 'Mật khẩu',
    confirm: 'Xác nhận mật khẩu',
    noteTitle: 'Lưu ý về tiếp cận',
    note1: 'Tất cả input đều có label.',
    note2: 'Mật khẩu dùng autocomplete chuẩn.',
    submit: 'Tạo tài khoản',
    loginNote: 'Đã có tài khoản?',
    login: 'Đăng nhập',
    browse: 'Duyệt việc làm trước',
  },
  en: {
    title: 'Create an account',
    desc: 'Static form to lock the UI before validation and API work.',
    back: 'Back to home',
    asideTitle: 'Sign up',
    asideHeading: 'A static registration form to verify layout and input order',
    asideDesc: 'Choose a role, enter basic details, and inspect how the content areas are arranged for accessibility.',
    quote: 'Job seekers and employers both need a clear form with visible labels, not placeholder-only hints.',
    role: 'Role',
    roleNKT: 'Job seeker',
    roleNTD: 'Employer',
    name: 'Full name / Company name',
    email: 'Email',
    password: 'Password',
    confirm: 'Confirm password',
    noteTitle: 'Accessibility notes',
    note1: 'Every input has a visible label.',
    note2: 'Password uses standard autocomplete.',
    submit: 'Create account',
    loginNote: 'Already have an account?',
    login: 'Log in',
    browse: 'Browse jobs first',
  },
} as const;

export default function RegisterPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === 'en' ? 'en' : 'vi';
  const t = copy[locale];

  return (
    <main id="main-content" className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Building2 className="h-6 w-6" aria-hidden="true" />
          AccessJobs
        </div>
        <div className="max-w-md space-y-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/70">
            {t.asideTitle}
          </p>
          <h1 className="text-4xl font-bold tracking-tight">
            {t.asideHeading}
          </h1>
          <p className="text-base leading-relaxed text-white/85">
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
        <div className="w-full max-w-lg">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {t.back}
          </Link>

          <Card className="border-none shadow-xl sm:border">
            <CardHeader className="space-y-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HeartHandshake className="h-7 w-7" aria-hidden="true" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">{t.title}</CardTitle>
              <CardDescription>{t.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" noValidate>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    {t.role}
                  </label>
                  <select
                    id="role"
                    defaultValue="NKT"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <option value="NKT">{t.roleNKT}</option>
                    <option value="NTD">{t.roleNTD}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    defaultValue="Nguyễn Văn A"
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>

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

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      {t.password}
                    </label>
                    <input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      defaultValue="••••••••"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      {t.confirm}
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      defaultValue="••••••••"
                      className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed bg-muted/40 p-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{t.noteTitle}</p>
                  <ul className="mt-2 space-y-2">
                    <li className="flex gap-2">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {t.note1}
                    </li>
                    <li className="flex gap-2">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {t.note2}
                    </li>
                  </ul>
                </div>

                <button type="button" className="h-11 w-full rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  {t.submit}
                </button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 border-t p-6">
              <p className="text-center text-sm text-muted-foreground">
                {t.loginNote}{' '}
                <Link href="/login" className="font-semibold text-primary hover:underline">
                  {t.login}
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
