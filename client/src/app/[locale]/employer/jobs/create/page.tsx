import { Metadata } from 'next';
import { BadgeCheck, Briefcase, CalendarDays, Eye, Layers3 } from 'lucide-react';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Đăng tin tuyển dụng | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh form đăng tin dành cho nhà tuyển dụng.',
};

const copy = {
  vi: {
    eyebrow: 'Nhà tuyển dụng',
    title: 'Form đăng tin static để chốt layout',
    desc: 'Mẫu form này mô tả đầy đủ các field chính, vùng preview và bố cục hai cột để kiểm tra trước khi nối backend.',
    sectionTitle: 'Thông tin tin tuyển dụng',
    titleLabel: 'Tên vị trí',
    descriptionLabel: 'Mô tả công việc',
    salaryMin: 'Lương tối thiểu',
    salaryMax: 'Lương tối đa',
    jobType: 'Loại công việc',
    disability: 'Dạng khuyết tật được hỗ trợ',
    industry: 'Ngành nghề',
    area: 'Khu vực',
    noteTitle: 'Ghi chú hỗ trợ',
    note: 'Khu vực này mô tả chỗ cho editor rich text, upload logo và preview trước khi submit.',
    draft: 'Lưu nháp',
    submit: 'Đăng tin',
    checklistTitle: 'Checklist trước khi đăng',
    checklist: [
      'Tiêu đề tối thiểu 5 ký tự.',
      'Mô tả rõ ràng, có bố cục đoạn ngắn.',
      'Có ít nhất một loại công việc và một dạng khuyết tật được hỗ trợ.',
      'Chỗ cho hạn nộp, logo và preview đã được giữ chỗ.',
    ],
    previewTitle: 'Preview nhanh',
    previewTitleLabel: 'Tiêu đề',
    previewDeadline: 'Hạn nộp',
    previewPreview: 'Xem trước',
    previewNote: 'Có thể dành thêm một vùng để preview nội dung rich text trước khi lưu.',
    back: 'Về dashboard',
    jobTypes: ['Toàn thời gian', 'Bán thời gian', 'Làm từ xa', 'Hybrid'],
    disabilities: ['Vận động', 'Thị giác', 'Thính giác', 'Ngôn ngữ'],
    provinces: ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Toàn quốc'],
  },
  en: {
    eyebrow: 'Employers',
    title: 'Static job-posting form to lock the layout',
    desc: 'This form mockup includes the main fields, a preview area, and a two-column layout to verify before backend wiring.',
    sectionTitle: 'Job information',
    titleLabel: 'Position title',
    descriptionLabel: 'Job description',
    salaryMin: 'Minimum salary',
    salaryMax: 'Maximum salary',
    jobType: 'Job type',
    disability: 'Supported disability types',
    industry: 'Industry',
    area: 'Location',
    noteTitle: 'Support notes',
    note: 'This area is reserved for the rich text editor, logo upload, and preview before submission.',
    draft: 'Save draft',
    submit: 'Post job',
    checklistTitle: 'Pre-publish checklist',
    checklist: [
      'The title should be at least 5 characters.',
      'The description should be clear and broken into short paragraphs.',
      'At least one job type and one disability type should be selected.',
      'Space is reserved for deadline, logo, and preview.',
    ],
    previewTitle: 'Quick preview',
    previewTitleLabel: 'Title',
    previewDeadline: 'Deadline',
    previewPreview: 'Preview',
    previewNote: 'You can reserve another area for previewing rich text before saving.',
    back: 'Back to dashboard',
    jobTypes: ['Full time', 'Part time', 'Remote', 'Hybrid'],
    disabilities: ['Mobility', 'Visual', 'Hearing', 'Speech'],
    provinces: ['Hanoi', 'Ho Chi Minh City', 'Da Nang', 'Nationwide'],
  },
} as const;

export default async function CreateJobPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Employers', href: '/employer/dashboard' },
        { label: 'Post a job' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Nhà tuyển dụng', href: '/employer/dashboard' },
        { label: 'Đăng tin tuyển dụng' },
      ];
  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageBreadcrumb items={crumbs} />
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
        <p className="mt-4 text-muted-foreground">{t.desc}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{t.sectionTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" noValidate>
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  {t.titleLabel}
                </label>
                <input
                  id="title"
                  type="text"
                  defaultValue={locale === 'en' ? 'Content specialist' : 'Chuyên viên nội dung số'}
                  className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {t.descriptionLabel}
                </label>
                <textarea
                  id="description"
                  rows={7}
                  defaultValue={
                    locale === 'en'
                      ? 'Write content, collaborate with marketing, and keep the documentation clear for users.'
                      : 'Viết nội dung, phối hợp marketing và đảm bảo tài liệu rõ ràng cho người dùng.'
                  }
                  className="min-h-[180px] w-full rounded-lg border border-input bg-background px-4 py-3 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="salaryMin" className="text-sm font-medium">
                    {t.salaryMin}
                  </label>
                  <input
                    id="salaryMin"
                    type="number"
                    defaultValue={10000000}
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="salaryMax" className="text-sm font-medium">
                    {t.salaryMax}
                  </label>
                  <input
                    id="salaryMax"
                    type="number"
                    defaultValue={15000000}
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="space-y-3 rounded-2xl border p-4">
                  <legend className="px-1 text-sm font-semibold">{t.jobType}</legend>
                  {t.jobTypes.map((item, index) => (
                    <label key={item} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" defaultChecked={index === 0} className="h-4 w-4 rounded border-input text-primary" />
                      {item}
                    </label>
                  ))}
                </fieldset>

                <fieldset className="space-y-3 rounded-2xl border p-4">
                  <legend className="px-1 text-sm font-semibold">{t.disability}</legend>
                  {t.disabilities.map((item, index) => (
                    <label key={item} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" defaultChecked={index < 2} className="h-4 w-4 rounded border-input text-primary" />
                      {item}
                    </label>
                  ))}
                </fieldset>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    {t.industry}
                  </label>
                  <input
                    id="industry"
                    type="text"
                    defaultValue={locale === 'en' ? 'Marketing' : 'Marketing'}
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="province" className="text-sm font-medium">
                    {t.area}
                  </label>
                  <select
                    id="province"
                    defaultValue={locale === 'en' ? 'Hanoi' : 'Hà Nội'}
                    className="h-12 w-full rounded-lg border border-input bg-background px-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {t.provinces.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed bg-muted/40 p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Layers3 className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.noteTitle}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{t.note}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button type="button" className="inline-flex h-11 items-center justify-center rounded-lg border px-4 text-sm font-medium">
                  {t.draft}
                </button>
                <button type="button" className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground">
                  {t.submit}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{t.checklistTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {t.checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl bg-muted/40 p-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.previewTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{t.previewTitleLabel}</p>
                <p className="mt-1 font-semibold">{locale === 'en' ? 'Content specialist' : 'Chuyên viên nội dung số'}</p>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{t.previewDeadline}</p>
                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  30/06/2026
                </p>
              </div>
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{t.previewPreview}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.previewNote}</p>
              </div>
              <Link href="/employer/dashboard" className={buttonVariants({ variant: 'outline', className: 'h-11 w-full rounded-xl' })}>
                <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.back}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
