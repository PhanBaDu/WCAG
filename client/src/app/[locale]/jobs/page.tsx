import { Metadata } from 'next';
import { Building2, Filter, MapPin, Search } from 'lucide-react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Việc làm | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh trang tìm việc với bộ lọc, danh sách kết quả và CTA rõ ràng.',
};

const copy = {
  vi: {
    eyebrow: 'Tìm kiếm việc làm',
    title: 'Danh sách việc làm tĩnh để chốt bố cục',
    desc: 'Màn hình này mô tả cách trình bày form tìm kiếm, bộ lọc và kết quả theo đúng tinh thần WCAG 2.2 AA.',
    heroTitle: 'Tìm việc tiếp cận, bố cục rõ ràng hơn',
    heroDesc: 'Khối minh hoạ tĩnh bên phải giúp trang bớt phẳng và cho thấy cách hiển thị hình ảnh, thẻ, và số liệu trước khi gắn dữ liệu thật.',
    heroStat1: '4 nhóm bộ lọc',
    heroStat2: '12+ vị trí minh hoạ',
    searchLabel: 'Từ khoá tìm kiếm',
    searchHint: 'Ô nhập chỉ hiển thị giao diện, chưa nối dữ liệu.',
    searchPlaceholder: 'Nhập tên việc làm, kỹ năng hoặc địa điểm',
    searchButton: 'Tìm kiếm',
    filtersTitle: 'Bộ lọc',
    filtersDesc: 'Nhóm bộ lọc được trình bày bằng fieldset/legend.',
    disabilityTypes: ['Vận động', 'Thị giác', 'Thính giác', 'Ngôn ngữ'],
    jobTypes: ['Toàn thời gian', 'Bán thời gian', 'Làm từ xa'],
    areas: ['Toàn quốc', 'Hà Nội'],
    resultsLabel: 'Kết quả tĩnh',
    resultsTitle: '4 việc làm đang được hiển thị',
    resultsDesc: 'Cập nhật theo bộ lọc minh họa',
    jobs: [
      {
        slug: 'nhan-vien-ho-tro-khach-hang',
        title: 'Nhân viên hỗ trợ khách hàng',
        company: 'Công ty Cổ phần Dịch vụ An Tâm',
        location: 'Hà Nội',
        type: 'Toàn thời gian',
        salary: '10 - 15 triệu',
        tags: ['Ưu tiên NKT', 'Làm việc hybrid', 'Có hướng dẫn quy trình'],
      },
      {
        slug: 'chuyen-vien-noi-dung',
        title: 'Chuyên viên nội dung',
        company: 'Access Media',
        location: 'TP. Hồ Chí Minh',
        type: 'Bán thời gian',
        salary: '8 - 12 triệu',
        tags: ['Làm việc từ xa', 'Thiết bị hỗ trợ', 'Lịch linh hoạt'],
      },
      {
        slug: 'nhan-vien-nhap-lieu',
        title: 'Nhân viên nhập liệu',
        company: 'Sao Mai Digital',
        location: 'Đà Nẵng',
        type: 'Làm từ xa',
        salary: 'Thỏa thuận',
        tags: ['Môi trường yên tĩnh', 'Đầu việc rõ ràng', 'Đào tạo ban đầu'],
      },
      {
        slug: 'tro-ly-hanh-chinh',
        title: 'Trợ lý hành chính',
        company: 'Hoà Nhập Việt',
        location: 'Cần Thơ',
        type: 'Toàn thời gian',
        salary: '9 - 13 triệu',
        tags: ['Không yêu cầu kinh nghiệm', 'Lối vào không bậc thềm', 'Phòng làm việc dễ tiếp cận'],
      },
    ],
    emptyNote: 'Trạng thái trống được mô phỏng bằng các bộ lọc và nhãn tĩnh để kiểm tra bố cục khi dữ liệu chưa có.',
    emptyCta: 'Tạo tài khoản để ứng tuyển',
  },
  en: {
    eyebrow: 'Job search',
    title: 'Static job listings to lock the layout',
    desc: 'This screen shows how the search form, filters, and results should be arranged according to WCAG 2.2 AA.',
    heroTitle: 'Accessible jobs with a cleaner layout',
    heroDesc: 'The static illustration on the right adds visual weight and shows how images, cards, and metrics can sit before real data arrives.',
    heroStat1: '4 filter groups',
    heroStat2: '12+ mock roles',
    searchLabel: 'Search keywords',
    searchHint: 'The field only shows the UI, no live data yet.',
    searchPlaceholder: 'Enter job title, skill, or location',
    searchButton: 'Search',
    filtersTitle: 'Filters',
    filtersDesc: 'The filter groups use fieldset/legend semantics.',
    disabilityTypes: ['Mobility', 'Visual', 'Hearing', 'Speech'],
    jobTypes: ['Full time', 'Part time', 'Remote'],
    areas: ['Nationwide', 'Hanoi'],
    resultsLabel: 'Static results',
    resultsTitle: '4 jobs are being shown',
    resultsDesc: 'Updated according to the mock filters',
    jobs: [
      {
        slug: 'nhan-vien-ho-tro-khach-hang',
        title: 'Customer support specialist',
        company: 'An Tam Services JSC',
        location: 'Hanoi',
        type: 'Full time',
        salary: '10 - 15 million VND',
        tags: ['Priority for PwD', 'Hybrid work', 'Guided process'],
      },
      {
        slug: 'chuyen-vien-noi-dung',
        title: 'Content specialist',
        company: 'Access Media',
        location: 'Ho Chi Minh City',
        type: 'Part time',
        salary: '8 - 12 million VND',
        tags: ['Remote friendly', 'Supportive tools', 'Flexible schedule'],
      },
      {
        slug: 'nhan-vien-nhap-lieu',
        title: 'Data entry staff',
        company: 'Sao Mai Digital',
        location: 'Da Nang',
        type: 'Remote',
        salary: 'Negotiable',
        tags: ['Quiet workspace', 'Clear tasks', 'Onboarding training'],
      },
      {
        slug: 'tro-ly-hanh-chinh',
        title: 'Administrative assistant',
        company: 'Hoa Nhap Viet',
        location: 'Can Tho',
        type: 'Full time',
        salary: '9 - 13 million VND',
        tags: ['No experience required', 'Step-free entry', 'Accessible office'],
      },
    ],
    emptyNote: 'The empty state is mocked with static filters and labels so you can verify the layout before data exists.',
    emptyCta: 'Create an account to apply',
  },
} as const;

const jobThumbnails: Record<string, { src: string; alt: string }> = {
  'nhan-vien-ho-tro-khach-hang': {
    src: '/job-support.svg',
    alt: 'Illustration for customer support role',
  },
  'chuyen-vien-noi-dung': {
    src: '/job-content.svg',
    alt: 'Illustration for content specialist role',
  },
  'nhan-vien-nhap-lieu': {
    src: '/job-data.svg',
    alt: 'Illustration for data entry role',
  },
  'tro-ly-hanh-chinh': {
    src: '/job-admin.svg',
    alt: 'Illustration for administrative assistant role',
  },
} as const;

export default async function JobsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];

  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.desc}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">{t.heroStat1}</span>
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">{t.heroStat2}</span>
          </div>
        </div>

        <Card className="overflow-hidden border-none shadow-xl">
          <CardContent className="grid gap-6 p-0 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="flex flex-col justify-between bg-primary/5 p-6">
              <div className="space-y-3">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">
                  {locale === 'en' ? 'Visual preview' : 'Minh hoạ trực quan'}
                </p>
                <h2 className="text-2xl font-bold tracking-tight">{t.heroTitle}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.heroDesc}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-background p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {locale === 'en' ? 'Search' : 'Tìm kiếm'}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{locale === 'en' ? 'Fast and accessible' : 'Nhanh và dễ tiếp cận'}</p>
                </div>
                <div className="rounded-2xl bg-background p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    {locale === 'en' ? 'Layout' : 'Bố cục'}
                  </p>
                  <p className="mt-2 text-sm font-semibold">{locale === 'en' ? 'Cards and filters' : 'Thẻ và bộ lọc'}</p>
                </div>
              </div>
            </div>
            <div className="relative min-h-[280px] overflow-hidden bg-slate-50">
                <Image
                  src="/now-hiring.png"
                  alt={locale === 'en' ? 'Now hiring sign illustration' : 'Minh hoạ bảng tuyển dụng'}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-contain p-4"
                />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4 text-xs font-medium text-white">
                {locale === 'en'
                  ? 'Now Hiring sign · CC BY-SA 3.0 · Wikimedia Commons'
                  : 'Bảng Now Hiring · CC BY-SA 3.0 · Wikimedia Commons'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Search className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.searchLabel}
              </CardTitle>
              <CardDescription>{t.searchHint}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="sr-only" htmlFor="job-search">
                {t.searchLabel}
              </label>
              <input
                id="job-search"
                type="search"
                defaultValue={locale === 'en' ? 'customer support' : 'hỗ trợ khách hàng'}
                className="h-14 w-full rounded-2xl border border-input bg-background px-4 text-base shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                placeholder={t.searchPlaceholder}
                aria-label={t.searchLabel}
              />
              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-primary px-4 text-sm font-medium text-primary-foreground sm:w-auto"
              >
                {t.searchButton}
              </button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.filtersTitle}
              </CardTitle>
              <CardDescription>{t.filtersDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">{locale === 'en' ? 'Disability type' : 'Dạng khuyết tật phù hợp'}</legend>
                {t.disabilityTypes.map((item) => (
                  <label key={item} className="flex items-center gap-3 text-sm">
                    <input type="checkbox" className="h-4 w-4 rounded border-input text-primary" />
                    {item}
                  </label>
                ))}
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">{locale === 'en' ? 'Job type' : 'Loại công việc'}</legend>
                {t.jobTypes.map((item) => (
                  <label key={item} className="flex items-center gap-3 text-sm">
                    <input type="checkbox" className="h-4 w-4 rounded border-input text-primary" />
                    {item}
                  </label>
                ))}
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold">{locale === 'en' ? 'Location' : 'Khu vực'}</legend>
                <label className="flex items-center gap-3 text-sm">
                  <input type="radio" name="province" className="h-4 w-4 border-input text-primary" defaultChecked />
                  {t.areas[0]}
                </label>
                <label className="flex items-center gap-3 text-sm">
                  <input type="radio" name="province" className="h-4 w-4 border-input text-primary" />
                  {t.areas[1]}
                </label>
              </fieldset>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-6">
          <Card className="border-none bg-primary/5 shadow-none">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-primary">{t.resultsLabel}</p>
                <h2 className="text-2xl font-bold tracking-tight">{t.resultsTitle}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" aria-hidden="true" />
                {t.resultsDesc}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.jobs.map((job) => (
              <Card key={job.slug} className="border-none shadow-lg transition-transform duration-200 hover:-translate-y-1">
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-3xl bg-slate-100">
                  <Image
                    src={jobThumbnails[job.slug]?.src ?? '/job-support.svg'}
                    alt={locale === 'en' ? jobThumbnails[job.slug]?.alt ?? 'Job illustration' : 'Minh hoạ việc làm'}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-sm font-bold text-primary">
                        {job.company
                          .split(' ')
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((part) => part[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                      <div className="space-y-2">
                      <CardTitle className="text-xl leading-tight">
                        <Link href={`/jobs/${job.slug}`} className="transition-colors hover:text-primary">
                          {job.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" aria-hidden="true" />
                        {job.company}
                      </CardDescription>
                    </div>
                    </div>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {job.type}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.location}
                    </span>
                    <span className="rounded-full bg-muted px-3 py-1">{job.salary}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link href={`/jobs/${job.slug}`} className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-xl' })}>
                      {locale === 'en' ? 'View details' : 'Xem chi tiết'}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-dashed">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">{t.emptyNote}</p>
              <Link href="/register" className={buttonVariants({ variant: 'secondary', className: 'h-11 rounded-xl' })}>
                {t.emptyCta}
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
