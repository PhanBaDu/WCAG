import { ArrowRight, Building2, HeartHandshake, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyboardShortcutsDemo } from '@/components/layout/keyboard-shortcuts-demo';
import { Link } from '@/i18n/routing';

const copy = {
  vi: {
    eyebrow: 'Cổng việc làm cho người khuyết tật',
    title: 'Kết nối việc làm dễ tiếp cận cho người khuyết tật',
    description:
      'Trang chủ static theo rules WCAG 2.2 AA, tập trung vào cấu trúc rõ ràng, điều hướng dễ dùng và nội dung minh họa cho các luồng chính của hệ thống.',
    primaryCta: 'Tìm việc ngay',
    secondaryCta: 'Đăng tin tuyển dụng',
    sectionTitle: 'Điểm nổi bật của giao diện',
    sectionDesc:
      'Các khối nội dung dưới đây mô tả cách bố cục tĩnh sẽ trình bày thông tin quan trọng trước khi thêm dữ liệu thực.',
    quickTitle: 'Quy trình sử dụng nhanh',
    quickDesc: 'Luồng giao diện tĩnh được chia thành ba bước đơn giản.',
    quickSteps: [
      'Người tìm việc duyệt danh sách việc làm và lọc theo nhu cầu.',
      'Mở chi tiết công việc để đọc mô tả, quyền lợi và hỗ trợ tiếp cận.',
      'Chuyển sang đăng ký, đăng nhập hoặc khu vực nhà tuyển dụng nếu cần.',
    ],
    actionsTitle: 'Hành động nhanh',
    actionsDesc: 'Ba nút CTA tĩnh cho các luồng chính.',
    footerTitle: 'Sẵn sàng xem giao diện tiếp theo?',
    footerDesc: 'Các trang còn lại trong app cũng được làm static để bạn có thể chốt bố cục trước khi gắn dữ liệu thật.',
    footerPrimary: 'Bắt đầu ngay',
    footerSecondary: 'Xem dashboard NTD',
    keyboardTitle: 'Điều hướng bằng bàn phím',
    keyboardDesc: 'Khối này mô phỏng cách GOV.UK trình bày hướng dẫn: rõ ràng, ngắn gọn và luôn ưu tiên người dùng bàn phím.',
    shortcutsTitle: 'Phím tắt thường dùng',
    landmarksTitle: 'Landmark chính',
    focusTitle: 'Focus ring',
    focusDesc: 'Tất cả control được giữ ring rõ ràng để khi tab, bạn luôn biết đang ở đâu.',
    shortcuts: [
      ['Tab', 'Next Focus', 'Tới phần tử tương tác tiếp theo'],
      ['Shift + Tab', 'Previous Focus', 'Quay lại phần tử trước'],
      ['Enter', 'Activate', 'Kích hoạt Link/Button'],
      ['Space', 'Activate / Toggle', 'Nhấn Button, Checkbox'],
      ['Esc', 'Close', 'Đóng Dialog / Menu'],
      ['H', 'Next Heading', 'Heading tiếp theo'],
      ['K', 'Next Link', 'Link tiếp theo'],
      ['B', 'Next Button', 'Button tiếp theo'],
      ['F', 'Next Form Field', 'Ô nhập tiếp theo'],
      ['M', 'Main Content', 'Tới khu vực nội dung chính'],
      ['N', 'Skip Navigation', 'Bỏ qua menu điều hướng'],
      ['G', 'Next Graphic', 'Hình ảnh tiếp theo'],
      ['T', 'Next Table', 'Bảng tiếp theo'],
      ['D', 'Next Landmark', 'Landmark tiếp theo'],
    ],
    landmarks: [
      ['Banner', '<header>'],
      ['Navigation', '<nav>'],
      ['Main', '<main>'],
      ['Search', '<search> / role="search"'],
      ['Complementary', '<aside>'],
      ['Content info', '<footer>'],
    ],
    stats: [
      { value: '1,200+', label: 'Việc làm thân thiện' },
      { value: '350+', label: 'Nhà tuyển dụng' },
      { value: '24/7', label: 'Truy cập và tìm kiếm' },
    ],
    highlights: [
      {
        icon: ShieldCheck,
        title: 'An toàn và dễ tiếp cận',
        description: 'Thiết kế theo WCAG 2.2 AA với focus rõ ràng, tương phản tốt và thao tác bàn phím đầy đủ.',
      },
      {
        icon: Building2,
        title: 'Dành cho NKT và NTD',
        description: 'Giao diện mẫu cho người tìm việc, nhà tuyển dụng và khu vực quản trị trong cùng hệ thống.',
      },
      {
        icon: HeartHandshake,
        title: 'Trải nghiệm thân thiện',
        description: 'Bố cục tĩnh, dễ quét nhanh, ưu tiên nội dung rõ ràng và mạch lạc trước khi gắn dữ liệu động.',
      },
    ],
  },
  en: {
    eyebrow: 'Job portal for persons with disabilities',
    title: 'Connecting accessible jobs for persons with disabilities',
    description:
      'Static home page following WCAG 2.2 AA rules, focused on clear structure, easy navigation, and content mockups for the core flows.',
    primaryCta: 'Find jobs now',
    secondaryCta: 'Post a job',
    sectionTitle: 'Highlights of the interface',
    sectionDesc:
      'These sections show how the static layout presents key information before real data is connected.',
    quickTitle: 'Quick user flow',
    quickDesc: 'The static UI is split into three simple steps.',
    quickSteps: [
      'Job seekers browse the job list and narrow it down with filters.',
      'Open a job detail page to read the description, benefits, and accessibility support.',
      'Move on to register, log in, or the employer area when needed.',
    ],
    actionsTitle: 'Quick actions',
    actionsDesc: 'Three static CTA buttons for the core flows.',
    footerTitle: 'Ready to see the next screen?',
    footerDesc: 'The remaining app screens are static too, so you can lock the layout before wiring real data.',
    footerPrimary: 'Get started',
    footerSecondary: 'View employer dashboard',
    keyboardTitle: 'Keyboard navigation',
    keyboardDesc: 'This block mirrors the GOV.UK style: clear, concise, and always designed for keyboard users first.',
    shortcutsTitle: 'Common shortcuts',
    landmarksTitle: 'Main landmarks',
    focusTitle: 'Focus ring',
    focusDesc: 'Interactive controls keep a clear focus ring so you always know where you are when tabbing around.',
    shortcuts: [
      ['Tab', 'Next Focus', 'Move to the next interactive element'],
      ['Shift + Tab', 'Previous Focus', 'Move to the previous element'],
      ['Enter', 'Activate', 'Activate a link or button'],
      ['Space', 'Activate / Toggle', 'Press buttons and checkboxes'],
      ['Esc', 'Close', 'Close dialogs and menus'],
      ['H', 'Next Heading', 'Jump to the next heading'],
      ['K', 'Next Link', 'Jump to the next link'],
      ['B', 'Next Button', 'Jump to the next button'],
      ['F', 'Next Form Field', 'Jump to the next field'],
      ['M', 'Main Content', 'Jump to the main content area'],
      ['N', 'Skip Navigation', 'Jump past navigation'],
      ['G', 'Next Graphic', 'Jump to the next graphic'],
      ['T', 'Next Table', 'Jump to the next table'],
      ['D', 'Next Landmark', 'Jump to the next landmark'],
    ],
    landmarks: [
      ['Banner', '<header>'],
      ['Navigation', '<nav>'],
      ['Main', '<main>'],
      ['Search', '<search> / role="search"'],
      ['Complementary', '<aside>'],
      ['Content info', '<footer>'],
    ],
    stats: [
      { value: '1,200+', label: 'Accessible jobs' },
      { value: '350+', label: 'Employers' },
      { value: '24/7', label: 'Browse anytime' },
    ],
    highlights: [
      {
        icon: ShieldCheck,
        title: 'Safe and accessible',
        description: 'WCAG 2.2 AA-friendly design with visible focus, strong contrast, and full keyboard support.',
      },
      {
        icon: Building2,
        title: 'For job seekers and employers',
        description: 'A sample interface for job seekers, employers, and the admin area in one system.',
      },
      {
        icon: HeartHandshake,
        title: 'Friendly experience',
        description: 'A static layout that is easy to scan, with clear and concise content before dynamic data is added.',
      },
    ],
  },
} as const;

export default async function LandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  return (
    <main id="main-content">
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-x-0 top-24 -z-10 mx-auto h-[28rem] w-[28rem] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-primary">
              {t.eyebrow}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t.title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t.description}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/jobs" className={buttonVariants({ size: 'lg', className: 'gov-focus h-12 rounded-full px-8' })}>
                {t.primaryCta}
                <Search className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/register?role=NTD"
                className={buttonVariants({ size: 'lg', variant: 'secondary', className: 'gov-focus h-12 rounded-full px-8' })}
              >
                {t.secondaryCta}
                <Building2 className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="mt-14 grid gap-4 rounded-3xl border bg-card/70 p-4 shadow-sm backdrop-blur sm:grid-cols-3 sm:p-6">
            {t.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-background p-6 text-center">
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <Card className="mx-auto mt-8 overflow-hidden border-none shadow-xl">
            <CardContent className="grid gap-0 p-0 md:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col justify-between bg-primary/5 p-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                    {locale === 'en' ? 'Photo preview' : 'Ảnh minh hoạ'}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {locale === 'en' ? 'A softer, more human feel' : 'Giao diện mềm hơn, có cảm xúc hơn'}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {locale === 'en'
                      ? 'A real illustration helps the page feel less flat while keeping the visual hierarchy simple and readable.'
                      : 'Một ảnh thật/ minh hoạ giúp trang bớt phẳng mà vẫn giữ hierarchy rõ ràng và dễ đọc.'}
                  </p>
                </div>
                <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                  {locale === 'en'
                    ? 'Source: Wikimedia Commons · CC0 (no attribution required, but kept as a nice-to-have visual).'
                    : 'Nguồn: Wikimedia Commons · CC0 (không bắt buộc ghi công, nhưng vẫn giữ như một chi tiết đẹp).'}
                </p>
              </div>

              <div className="relative min-h-[280px] overflow-hidden bg-slate-50">
                <Image
                  src="/human-resources.png"
                  alt={locale === 'en' ? 'Human resources and team support illustration' : 'Minh hoạ nhân sự và hỗ trợ đội ngũ'}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.sectionTitle}</h2>
            <p className="mt-4 text-muted-foreground">
              {t.sectionDesc}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.highlights.map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title} className="border-none shadow-lg transition-transform duration-200 hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{item.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="overflow-hidden border-none shadow-lg">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-2xl">{t.quickTitle}</CardTitle>
                <CardDescription>{t.quickDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {t.quickSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl border p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t.actionsTitle}</CardTitle>
                <CardDescription>{t.actionsDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/login" className={buttonVariants({ variant: 'outline', className: 'gov-focus h-12 w-full justify-start rounded-xl' })}>
                  {locale === 'en' ? 'Log in' : 'Đăng nhập tài khoản'}
                </Link>
                <Link href="/register" className={buttonVariants({ className: 'gov-focus h-12 w-full justify-start rounded-xl' })}>
                  {locale === 'en' ? 'Create an account' : 'Tạo tài khoản mới'}
                </Link>
                <Link href="/jobs" className={buttonVariants({ variant: 'secondary', className: 'gov-focus h-12 w-full justify-start rounded-xl' })}>
                  {locale === 'en' ? 'Browse all jobs' : 'Xem toàn bộ việc làm'}
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t bg-background py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-primary/5 p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.footerTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t.footerDesc}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/register" className={buttonVariants({ size: 'lg', className: 'gov-focus h-12 rounded-full px-8' })}>
                {t.footerPrimary}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/employer/dashboard" className={buttonVariants({ size: 'lg', variant: 'outline', className: 'gov-focus h-12 rounded-full px-8' })}>
                {t.footerSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/20 py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.keyboardTitle}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.shortcutsTitle}</h2>
            <p className="mt-4 text-muted-foreground">{t.keyboardDesc}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t.shortcutsTitle}</CardTitle>
                <CardDescription>{locale === 'en' ? 'Use these patterns to move through the page quickly.' : 'Dùng các phím này để di chuyển nhanh trên trang.'}</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <caption className="sr-only">{t.shortcutsTitle}</caption>
                  <thead className="border-b text-muted-foreground">
                    <tr>
                      <th scope="col" className="px-3 py-3 font-medium">{locale === 'en' ? 'Key' : 'Phím'}</th>
                      <th scope="col" className="px-3 py-3 font-medium">{locale === 'en' ? 'Action' : 'Action'}</th>
                      <th scope="col" className="px-3 py-3 font-medium">{locale === 'en' ? 'Meaning' : 'Ý nghĩa'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.shortcuts.map(([key, action, meaning]) => (
                      <tr key={key} className="border-b last:border-0">
                        <td className="px-3 py-3 align-top">
                          <kbd className="inline-flex min-w-16 items-center justify-center rounded-md border bg-background px-2 py-1 font-mono text-xs font-semibold shadow-sm">
                            {key}
                          </kbd>
                        </td>
                        <td className="px-3 py-3 align-top font-medium">{action}</td>
                        <td className="px-3 py-3 align-top text-muted-foreground">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl">{t.landmarksTitle}</CardTitle>
                  <CardDescription>{locale === 'en' ? 'These landmarks help screen readers jump around the page.' : 'Các landmark này giúp màn hình đọc dễ nhảy tới đúng vùng.'}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {t.landmarks.map(([label, element]) => (
                    <div key={label} className="flex items-start justify-between gap-4 rounded-2xl border bg-background p-4">
                      <div>
                        <p className="font-medium">{label}</p>
                        <p className="text-sm text-muted-foreground">{element}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none bg-primary/5 shadow-none">
                <CardContent className="space-y-3 p-6">
                  <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">{t.focusTitle}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t.focusDesc}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {locale === 'en'
                      ? 'This matches the GOV.UK pattern: a visible skip link, strong focus state, and semantic landmarks.'
                      : 'Điều này giống pattern GOV.UK: có skip link rõ ràng, focus state mạnh và landmark semantic.'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-8">
            <KeyboardShortcutsDemo locale={locale} />
          </div>
        </div>
      </section>
    </main>
  );
}
