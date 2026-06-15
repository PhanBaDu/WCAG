import { Metadata } from 'next';
import { Building2, Filter, MapPin, Accessibility, Briefcase, Factory, CircleDollarSign, ArrowUpDown, Star } from 'lucide-react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { JobsFilterAside } from '@/components/jobs/jobs-filter-aside';
import { FilterRadioGroup } from '@/components/jobs/filter-radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Việc làm | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh trang tìm việc với bộ lọc, danh sách kết quả và CTA rõ ràng.',
};

const copy = {
  vi: {
    pageTitle: 'Tìm kiếm việc làm',
    searchLabel: 'Từ khoá tìm kiếm',
    searchPlaceholder: 'Nhập tên việc làm, kỹ năng hoặc địa điểm',
    searchButton: 'Tìm kiếm',
    filtersTitle: 'Bộ lọc',
    searchScopeLegend: 'Tìm theo',
    searchScope: [
      { value: 'title', label: 'Tên việc làm' },
      { value: 'company', label: 'Tên công ty' },
      { value: 'both', label: 'Cả hai' },
    ],
    disabilityLegend: 'Dạng khuyết tật phù hợp',
    disabilityTypes: ['Vận động', 'Thị giác', 'Thính giác', 'Ngôn ngữ', 'Nhận thức', 'Khác'],
    jobTypeLegend: 'Loại công việc',
    jobTypes: ['Toàn thời gian', 'Bán thời gian', 'Làm từ xa', 'Hybrid'],
    locationLegend: 'Khu vực',
    areas: ['Toàn quốc', 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ'],
    industryLegend: 'Ngành nghề',
    industries: ['Công nghệ thông tin', 'Dịch vụ khách hàng', 'Hành chính văn phòng', 'Marketing / Truyền thông'],
    salaryLegend: 'Mức lương',
    salaryRanges: ['Dưới 10 triệu', '10 - 15 triệu', '15 - 20 triệu', 'Trên 20 triệu', 'Thỏa thuận'],
    sortLegend: 'Sắp xếp theo',
    sortOptions: [
      { value: 'relevance', label: 'Liên quan nhất' },
      { value: 'date', label: 'Mới nhất' },
      { value: 'salary', label: 'Lương cao nhất' },
    ],
    priorityLegend: 'Ưu tiên',
    priorityLabel: 'Chỉ hiện việc ưu tiên người khuyết tật',
    clearFilters: 'Xóa tất cả bộ lọc',
    resultsTitle: (count: number) => `${count} việc làm`,
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
  },
  en: {
    pageTitle: 'Job search',
    searchLabel: 'Search keywords',
    searchPlaceholder: 'Enter job title, skill, or location',
    searchButton: 'Search',
    filtersTitle: 'Filters',
    searchScopeLegend: 'Search in',
    searchScope: [
      { value: 'title', label: 'Job title' },
      { value: 'company', label: 'Company name' },
      { value: 'both', label: 'Both' },
    ],
    disabilityLegend: 'Disability type',
    disabilityTypes: ['Mobility', 'Visual', 'Hearing', 'Speech', 'Cognitive', 'Other'],
    jobTypeLegend: 'Job type',
    jobTypes: ['Full time', 'Part time', 'Remote', 'Hybrid'],
    locationLegend: 'Location',
    areas: ['Nationwide', 'Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Can Tho'],
    industryLegend: 'Industry',
    industries: ['Information technology', 'Customer service', 'Office administration', 'Marketing / Media'],
    salaryLegend: 'Salary range',
    salaryRanges: ['Under 10 million VND', '10 - 15 million VND', '15 - 20 million VND', 'Over 20 million VND', 'Negotiable'],
    sortLegend: 'Sort by',
    sortOptions: [
      { value: 'relevance', label: 'Most relevant' },
      { value: 'date', label: 'Newest' },
      { value: 'salary', label: 'Highest salary' },
    ],
    priorityLegend: 'Priority',
    priorityLabel: 'Show disability-priority jobs only',
    clearFilters: 'Clear all filters',
    resultsTitle: (count: number) => `${count} jobs`,
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
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Jobs' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Việc làm' },
      ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-2 sm:px-6 lg:px-8 lg:pb-12 lg:pt-3">
      <PageBreadcrumb items={crumbs} />
      <h1 className="mb-6 text-2xl font-bold tracking-tight">{t.pageTitle}</h1>

      <form
        role="search"
        aria-label={t.pageTitle}
        className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4"
      >
        <div className="w-full min-w-[16rem] max-w-2xl">
          <label htmlFor="job-search" className="sr-only">
            {t.searchLabel}
          </label>
          <input
            id="job-search"
            type="search"
            className="gov-input h-12 w-full px-4 text-base"
            placeholder={t.searchPlaceholder}
          />
        </div>
        <button type="button" className={buttonVariants({ className: 'h-12 w-full shrink-0 sm:w-auto sm:self-center' })}>
          {t.searchButton}
        </button>
      </form>

      <div className="grid gap-8 lg:grid-cols-[30%_70%]">
        <JobsFilterAside label={t.filtersTitle}>
          <Card className="overflow-visible border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Filter className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.filtersTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FilterRadioGroup legend={t.searchScopeLegend} name="search-scope" options={[...t.searchScope]} />

              <fieldset className="space-y-3 border-t border-border pt-6">
                <legend className="flex items-center gap-2 text-sm font-semibold">
                  <Accessibility className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.disabilityLegend}
                </legend>
                {t.disabilityTypes.map((item) => (
                  <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                    <input type="checkbox" name="disability-type" value={item} className="filter-control rounded text-primary" />
                    <span className="filter-option-text">{item}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="space-y-3 border-t border-border pt-6">
                <legend className="flex items-center gap-2 text-sm font-semibold">
                  <Briefcase className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.jobTypeLegend}
                </legend>
                {t.jobTypes.map((item) => (
                  <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                    <input type="checkbox" name="job-type" value={item} className="filter-control rounded text-primary" />
                    <span className="filter-option-text">{item}</span>
                  </label>
                ))}
              </fieldset>

              <FilterRadioGroup
                className="border-t border-border pt-6"
                name="province"
                legend={
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.locationLegend}
                  </span>
                }
                options={t.areas.map((item) => ({ value: item, label: item }))}
              />

              <fieldset className="space-y-3 border-t border-border pt-6">
                <legend className="flex items-center gap-2 text-sm font-semibold">
                  <Factory className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.industryLegend}
                </legend>
                {t.industries.map((item) => (
                  <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                    <input type="checkbox" name="industry" value={item} className="filter-control rounded text-primary" />
                    <span className="filter-option-text">{item}</span>
                  </label>
                ))}
              </fieldset>

              <fieldset className="space-y-3 border-t border-border pt-6">
                <legend className="flex items-center gap-2 text-sm font-semibold">
                  <CircleDollarSign className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.salaryLegend}
                </legend>
                {t.salaryRanges.map((item) => (
                  <label key={item} className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                    <input type="checkbox" name="salary-range" value={item} className="filter-control rounded text-primary" />
                    <span className="filter-option-text">{item}</span>
                  </label>
                ))}
              </fieldset>

              <FilterRadioGroup
                className="border-t border-border pt-6"
                name="sort-by"
                legend={
                  <span className="flex items-center gap-2">
                    <ArrowUpDown className="h-4 w-4 text-primary" aria-hidden="true" />
                    {t.sortLegend}
                  </span>
                }
                options={[...t.sortOptions]}
              />

              <fieldset className="space-y-3 border-t border-border pt-6">
                <legend className="flex items-center gap-2 text-sm font-semibold">
                  <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.priorityLegend}
                </legend>
                <label className="filter-option flex cursor-pointer items-center gap-3 text-sm text-[#0b0c0c]">
                  <input type="checkbox" name="disability-priority" className="filter-control rounded text-primary" />
                  <span className="filter-option-text">{t.priorityLabel}</span>
                </label>
              </fieldset>

              <button type="button" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full' })}>
                {t.clearFilters}
              </button>
            </CardContent>
          </Card>
        </JobsFilterAside>

        <section
          id="jobs-results"
          tabIndex={-1}
          aria-labelledby="jobs-results-heading"
          className="space-y-6 outline-none"
        >
          <h2 id="jobs-results-heading" className="text-xl font-bold tracking-tight">
            {t.resultsTitle(t.jobs.length)}
          </h2>

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
                        <Link href={`/jobs/${job.slug}`} className="gov-link">
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
        </section>
      </div>
    </div>
  );
}
