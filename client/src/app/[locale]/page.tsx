import { ArrowRight, Building2, HeartHandshake, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

const copy = {
  vi: {
    eyebrow: 'Cổng việc làm cho người khuyết tật',
    title: 'Kết nối việc làm dễ tiếp cận cho người khuyết tật',
    description:
      'Trang chủ tĩnh giới thiệu cổng việc làm, nơi người tìm việc và nhà tuyển dụng có thể bắt đầu các luồng chính một cách rõ ràng, gọn gàng và dễ dùng.',
    primaryCta: 'Tìm việc ngay',
    secondaryCta: 'Đăng tin tuyển dụng',
    sectionTitle: 'Dành cho từng nhóm người dùng',
    sectionDesc:
      'Bố cục này giúp nhìn nhanh vai trò của từng khu vực trong hệ thống trước khi gắn dữ liệu thật.',
    quickTitle: 'Quy trình sử dụng nhanh',
    quickDesc: 'Luồng giao diện tĩnh được chia thành ba bước đơn giản.',
    quickSteps: [
      'Người tìm việc duyệt danh sách việc làm và lọc theo nhu cầu.',
      'Mở chi tiết công việc để đọc mô tả, quyền lợi và hỗ trợ tiếp cận.',
      'Chuyển sang đăng ký, đăng nhập hoặc khu vực nhà tuyển dụng nếu cần.',
    ],
    actionsTitle: 'Hành động nhanh',
    actionsDesc: 'Ba liên kết tĩnh giúp người dùng vào đúng luồng ngay lập tức.',
    actionLinks: [
      { href: '/jobs', label: 'Tìm việc phù hợp', description: 'Duyệt danh sách việc làm và lọc theo nhu cầu.' },
      { href: '/register', label: 'Tạo hồ sơ ứng viên', description: 'Bắt đầu hồ sơ để ứng tuyển nhanh hơn.' },
      { href: '/register?role=NTD', label: 'Đăng tin tuyển dụng', description: 'Tạo tin tuyển dụng thân thiện với NKT.' },
    ],
    footerTitle: 'Sẵn sàng xem giao diện tiếp theo?',
    footerDesc: 'Các trang còn lại trong app cũng được làm static để bạn có thể chốt bố cục trước khi gắn dữ liệu thật.',
    footerPrimary: 'Bắt đầu ngay',
    footerSecondary: 'Xem dashboard NTD',
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
      'A static home page introducing the job portal, where job seekers and employers can start the core flows quickly and clearly.',
    primaryCta: 'Find jobs now',
    secondaryCta: 'Post a job',
    sectionTitle: 'Built for each user group',
    sectionDesc:
      'This layout helps show what each area of the system is for before real data is connected.',
    quickTitle: 'Quick user flow',
    quickDesc: 'The static UI is split into three simple steps.',
    quickSteps: [
      'Job seekers browse the job list and narrow it down with filters.',
      'Open a job detail page to read the description, benefits, and accessibility support.',
      'Move on to register, log in, or the employer area when needed.',
    ],
    actionsTitle: 'Quick actions',
    actionsDesc: 'Three static links that take people straight into the core flows.',
    actionLinks: [
      { href: '/jobs', label: 'Find suitable jobs', description: 'Browse and filter the job list by need.' },
      { href: '/register', label: 'Create a candidate profile', description: 'Start a profile to apply faster.' },
      { href: '/register?role=NTD', label: 'Post a job', description: 'Create an inclusive job post for candidates.' },
    ],
    footerTitle: 'Ready to see the next screen?',
    footerDesc: 'The remaining app screens are static too, so you can lock the layout before wiring real data.',
    footerPrimary: 'Get started',
    footerSecondary: 'View employer dashboard',
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
    <div>
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
              <Link href="/jobs" className={buttonVariants({ size: 'lg', className: 'h-12 rounded-full px-8' })}>
                {t.primaryCta}
                <Search className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/register?role=NTD"
                className={buttonVariants({ size: 'lg', variant: 'secondary', className: 'h-12 rounded-full px-8' })}
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
                {t.actionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-2xl border border-transparent bg-background p-4 transition-colors hover:border-border hover:bg-muted/30"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="gov-link block text-base font-semibold">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                ))}
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
              <Link href="/register" className={buttonVariants({ size: 'lg', className: 'h-12 rounded-full px-8' })}>
                {t.footerPrimary}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/employer/dashboard" className={buttonVariants({ size: 'lg', variant: 'outline', className: 'h-12 rounded-full px-8' })}>
                {t.footerSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
