import { ArrowRight, Building2, Search } from 'lucide-react';
import { AnimatedStatValue } from '@/components/home/animated-stat-value';
import { ConnectLottie } from '@/components/home/connect-lottie';
import { HeroLottie } from '@/components/home/hero-lottie';
import { LottieAnimation } from '@/components/home/lottie-animation';
import { buttonVariants } from '@/components/ui/button';
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
      'Chúng tôi kết nối người tìm việc với cơ hội thực sự phù hợp — nơi kỹ năng được công nhận, nhu cầu hỗ trợ cá nhân được tôn trọng, và quy trình tuyển dụng rõ ràng, dễ tiếp cận cho cả ứng viên lẫn doanh nghiệp muốn xây dựng môi trường làm việc hòa nhập.',
    illustrationAlt: 'Minh hoạ đội ngũ nhân sự và hỗ trợ tại nơi làm việc',
    stats: [
      {
        value: '1,200+',
        countTo: 1200,
        suffix: '+',
        label: 'Việc làm thân thiện',
        lottie: '/lottie/02897fe8-1188-11ee-b779-7b1675fa93d5.json',
      },
      {
        value: '350+',
        countTo: 350,
        suffix: '+',
        label: 'Nhà tuyển dụng',
        lottie: '/lottie/d76e9edc-1188-11ee-86f2-c3028b649406.json',
      },
      {
        value: '24/7',
        label: 'Truy cập và tìm kiếm',
        lottie: '/lottie/62c9d8c4-1180-11ee-8c03-4375fe273ca8.json',
      },
    ],
    highlights: [
      {
        title: 'Dễ tiếp cận, dễ thao tác',
        description:
          'Giao diện rõ ràng, dùng tốt bằng bàn phím và trên nhiều thiết bị — để bạn tập trung vào việc quan trọng.',
      },
      {
        title: 'Cho người tìm việc và nhà tuyển dụng',
        description:
          'Người tìm việc khám phá cơ hội; nhà tuyển dụng đăng tin và quản lý ứng viên trên cùng một hệ thống.',
      },
      {
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
      'We connect job seekers with roles that truly fit — where skills are valued, individual support needs are respected, and the hiring process stays clear and accessible for both candidates and employers building inclusive workplaces.',
    illustrationAlt: 'Illustration of human resources and team support at work',
    stats: [
      {
        value: '1,200+',
        countTo: 1200,
        suffix: '+',
        label: 'Accessible jobs',
        lottie: '/lottie/02897fe8-1188-11ee-b779-7b1675fa93d5.json',
      },
      {
        value: '350+',
        countTo: 350,
        suffix: '+',
        label: 'Employers',
        lottie: '/lottie/d76e9edc-1188-11ee-86f2-c3028b649406.json',
      },
      {
        value: '24/7',
        label: 'Browse anytime',
        lottie: '/lottie/62c9d8c4-1180-11ee-8c03-4375fe273ca8.json',
      },
    ],
    highlights: [
      {
        title: 'Accessible and easy to use',
        description:
          'A clear interface that works well with the keyboard and across devices — so you can focus on what matters.',
      },
      {
        title: 'For job seekers and employers',
        description:
          'Job seekers explore opportunities; employers post roles and manage candidates in one place.',
      },
      {
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
      <section className="relative overflow-hidden pt-24 pb-0">
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

          <div className="mt-14 grid gap-4 rounded-3xl bg-muted p-4 sm:grid-cols-3">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center overflow-hidden rounded-2xl bg-background p-6 text-center"
              >
                <AnimatedStatValue
                  value={stat.value}
                  countTo={'countTo' in stat ? stat.countTo : undefined}
                  suffix={'suffix' in stat ? stat.suffix : undefined}
                />
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
                {'lottie' in stat && stat.lottie ? (
                  <div className="mt-4 w-full">
                    <LottieAnimation
                      src={stat.lottie}
                      className="w-full max-w-[320px]"
                      frameMax
                      maxWidth={320}
                      maxHeight={320}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 rounded-3xl bg-muted p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col justify-center rounded-2xl bg-background p-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-primary">
                    {t.illustrationLabel}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">
                    {t.illustrationTitle}
                  </h2>
                  <p className="text-base leading-relaxed tracking-normal text-muted-foreground">
                    {t.illustrationDesc}
                  </p>
                </div>
              </div>

              <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-background p-6">
                <ConnectLottie />
              </div>
            </div>
          </div>

          <hr className="gov-section-divider mt-12" aria-hidden="true" />
        </div>
      </section>

      <section className="bg-background pb-0 pt-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.sectionTitle}</h2>
            <p className="mt-4 text-muted-foreground">
              {t.sectionDesc}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {t.highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-gradient-to-br from-primary/10 via-background to-sky-100/70 p-6 transition-transform duration-200 hover:-translate-y-1 dark:from-primary/20 dark:via-background dark:to-primary/10"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <hr className="gov-section-divider mt-12" aria-hidden="true" />
        </div>
      </section>

      <section className="bg-background pb-0 pt-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl bg-background">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{t.quickTitle}</h2>
                <p className="text-muted-foreground">{t.quickDesc}</p>
              </div>
              <div className="mt-6 space-y-4">
                {t.quickSteps.map((step, index) => (
                  <div key={step} className="flex gap-4 rounded-2xl bg-muted p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-background">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold">{t.actionsTitle}</h2>
                <p className="text-muted-foreground">{t.actionsDesc}</p>
              </div>
              <div className="mt-6 space-y-3">
                {t.actionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-start gap-4 rounded-2xl p-4 outline-none transition-colors focus-visible:outline-none focus-visible:ring-0"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-muted text-foreground transition-colors group-hover:bg-[#ffdd00] group-focus-visible:bg-[#ffdd00]">
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="gov-link inline text-base font-semibold transition-[background-color] duration-150 hover:bg-[#ffdd00] hover:text-[#1d70b8] hover:decoration-[#1d70b8] hover:[text-decoration-thickness:1px] group-hover:bg-[#ffdd00] group-hover:text-[#1d70b8] group-hover:decoration-[#1d70b8] group-hover:[text-decoration-thickness:1px] group-focus-visible:bg-[#ffdd00] group-focus-visible:text-[#1d70b8] group-focus-visible:decoration-[#1d70b8] group-focus-visible:[text-decoration-thickness:1px]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <hr className="gov-section-divider mt-12" aria-hidden="true" />
        </div>
      </section>

      <section className="bg-background pb-20 pt-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-muted p-4">
            <div className="rounded-2xl bg-background p-8 text-center sm:p-12">
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
        </div>
      </section>
    </div>
  );
}
