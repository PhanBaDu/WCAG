import { ArrowRight, Building2, HeartHandshake, Search, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { HeroLottie } from '@/components/home/hero-lottie';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

const copy = {
  vi: {
    eyebrow: 'Cổng việc làm cho người khuyết tật',
    title: 'Kết nối việc làm dễ tiếp cận cho người khuyết tật',
    description:
      'AccessJobs VN giúp người tìm việc khám phá cơ hội phù hợp với khả năng và nhu cầu hỗ trợ, đồng thời hỗ trợ nhà tuyển dụng tiếp cận ứng viên tài năng trong môi trường làm việc hòa nhập.',
    primaryCta: 'Tìm việc ngay',
    secondaryCta: 'Đăng tin tuyển dụng',
    sectionTitle: 'Vì sao chọn AccessJobs VN?',
    sectionDesc:
      'Nền tảng được thiết kế để mọi người — dù là người tìm việc hay nhà tuyển dụng — đều có thể bắt đầu nhanh và hoàn thành việc cần làm.',
    quickTitle: 'Bắt đầu trong vài phút',
    quickDesc: 'Ba bước đơn giản để bạn vào đúng hướng, không cần học quy trình phức tạp.',
    quickSteps: [
      'Duyệt việc làm và lọc theo kỹ năng, địa điểm hoặc hình thức làm việc.',
      'Đọc mô tả công việc, quyền lợi và thông tin hỗ trợ tiếp cận tại nơi làm việc.',
      'Tạo hồ sơ, ứng tuyển hoặc đăng tin tuyển dụng khi bạn đã sẵn sàng.',
    ],
    actionsTitle: 'Hành động nhanh',
    actionsDesc: 'Chọn việc cần làm ngay — mọi liên kết đưa bạn thẳng tới đúng khu vực.',
    actionLinks: [
      { href: '/jobs', label: 'Tìm việc phù hợp', description: 'Duyệt danh sách việc làm và lọc theo nhu cầu của bạn.' },
      { href: '/register', label: 'Tạo hồ sơ ứng viên', description: 'Lưu thông tin một lần để ứng tuyển nhanh hơn.' },
      { href: '/register?role=NTD', label: 'Đăng tin tuyển dụng', description: 'Đăng vị trí mới và tiếp cận ứng viên phù hợp.' },
    ],
    footerTitle: 'Sẵn sàng tìm việc hoặc tuyển dụng?',
    footerDesc:
      'Tạo tài khoản miễn phí để lưu hồ sơ, theo dõi tin tuyển dụng hoặc đăng vị trí mới cho doanh nghiệp của bạn.',
    footerPrimary: 'Bắt đầu ngay',
    footerSecondary: 'Xem khu vực nhà tuyển dụng',
    illustrationLabel: 'Cơ hội việc làm hòa nhập',
    illustrationTitle: 'Kết nối con người với công việc phù hợp',
    illustrationDesc:
      'Chúng tôi tin mỗi người đều xứng đáng có cơ hội làm việc trong môi trường tôn trọng khả năng và nhu cầu cá nhân.',
    illustrationAlt: 'Minh hoạ đội ngũ nhân sự và hỗ trợ tại nơi làm việc',
    stats: [
      { value: '1,200+', label: 'Việc làm thân thiện' },
      { value: '350+', label: 'Nhà tuyển dụng' },
      { value: '24/7', label: 'Truy cập và tìm kiếm' },
    ],
    highlights: [
      {
        icon: ShieldCheck,
        title: 'Dễ tiếp cận, dễ thao tác',
        description:
          'Giao diện rõ ràng, dùng tốt bằng bàn phím và trên nhiều thiết bị — để bạn tập trung vào việc quan trọng.',
      },
      {
        icon: Building2,
        title: 'Cho người tìm việc và nhà tuyển dụng',
        description:
          'Người tìm việc khám phá cơ hội; nhà tuyển dụng đăng tin và quản lý ứng viên trên cùng một hệ thống.',
      },
      {
        icon: HeartHandshake,
        title: 'Môi trường tôn trọng và hòa nhập',
        description:
          'Thông tin công việc minh bạch, quy trình đơn giản — hướng tới kết nối bền vững giữa ứng viên và doanh nghiệp.',
      },
    ],
  },
  en: {
    eyebrow: 'Job portal for persons with disabilities',
    title: 'Connecting accessible jobs for persons with disabilities',
    description:
      'AccessJobs VN helps job seekers find roles that match their skills and support needs, while helping employers reach talented candidates in an inclusive workplace.',
    primaryCta: 'Find jobs now',
    secondaryCta: 'Post a job',
    sectionTitle: 'Why AccessJobs VN?',
    sectionDesc:
      'The platform is built so everyone — job seekers and employers alike — can get started quickly and finish what they came to do.',
    quickTitle: 'Get started in minutes',
    quickDesc: 'Three simple steps to point you in the right direction, without a complicated process.',
    quickSteps: [
      'Browse jobs and filter by skills, location, or work arrangement.',
      'Read the role description, benefits, and workplace accessibility information.',
      'Create a profile, apply, or post a job when you are ready.',
    ],
    actionsTitle: 'Quick actions',
    actionsDesc: 'Pick what you need to do — each link takes you straight to the right area.',
    actionLinks: [
      { href: '/jobs', label: 'Find suitable jobs', description: 'Browse the job list and filter by what you need.' },
      { href: '/register', label: 'Create a candidate profile', description: 'Save your details once and apply faster.' },
      { href: '/register?role=NTD', label: 'Post a job', description: 'Publish a new role and reach suitable candidates.' },
    ],
    footerTitle: 'Ready to find a job or hire someone?',
    footerDesc:
      'Create a free account to save your profile, track job posts, or publish new openings for your organisation.',
    footerPrimary: 'Get started',
    footerSecondary: 'View employer area',
    illustrationLabel: 'Inclusive job opportunities',
    illustrationTitle: 'Connecting people with the right work',
    illustrationDesc:
      'We believe everyone deserves a fair chance to work in an environment that respects their abilities and individual needs.',
    illustrationAlt: 'Illustration of human resources and team support at work',
    stats: [
      { value: '1,200+', label: 'Accessible jobs' },
      { value: '350+', label: 'Employers' },
      { value: '24/7', label: 'Browse anytime' },
    ],
    highlights: [
      {
        icon: ShieldCheck,
        title: 'Accessible and easy to use',
        description:
          'A clear interface that works well with the keyboard and across devices — so you can focus on what matters.',
      },
      {
        icon: Building2,
        title: 'For job seekers and employers',
        description:
          'Job seekers explore opportunities; employers post roles and manage candidates in one place.',
      },
      {
        icon: HeartHandshake,
        title: 'Respectful and inclusive',
        description:
          'Transparent job information and a simple process — built for lasting connections between candidates and employers.',
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

            <HeroLottie />
          </div>

          <div className="mt-14 grid gap-4 rounded-3xl bg-muted p-4 sm:grid-cols-3 sm:p-6">
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
                    {t.illustrationLabel}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {t.illustrationTitle}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.illustrationDesc}
                  </p>
                </div>
              </div>

              <div className="relative min-h-[280px] overflow-hidden bg-slate-50">
                <Image
                  src="/human-resources.png"
                  alt={t.illustrationAlt}
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
