import { Metadata } from 'next';
import { BadgeCheck, Briefcase, CalendarDays, Eye, Layers3 } from 'lucide-react';
import { EmployerRouteGate } from '@/components/auth/employer-route-gate';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
        { label: 'Employers', href: '/employer/dashboard' },
        { label: 'Post a job' },
      ]
    : [
        { label: 'Nhà tuyển dụng', href: '/employer/dashboard' },
        { label: 'Đăng tin tuyển dụng' },
      ];
  return (
    <EmployerRouteGate>
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 lg:pb-12 lg:pt-4">
      <PageBreadcrumb items={crumbs} className="mb-2" />
      <div className="grid gap-8 lg:grid-cols-[1.45fr_0.75fr]">
        <Card className="rounded-none border border-border shadow-lg">
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
                  className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[3px]"
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
                  className="min-h-[180px] w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 py-3 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[3px]"
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
                  className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[3px]"
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
                    className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[3px]"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="space-y-3 rounded-none border-2 border-[#0b0c0c] p-4">
                  <legend className="px-1 text-sm font-semibold">{t.jobType}</legend>
                  {t.jobTypes.map((item, index) => (
                    <label key={item} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" defaultChecked={index === 0} className="h-4 w-4 rounded-none border-input text-primary" />
                      {item}
                    </label>
                  ))}
                </fieldset>

                <fieldset className="space-y-3 rounded-none border-2 border-[#0b0c0c] p-4">
                  <legend className="px-1 text-sm font-semibold">{t.disability}</legend>
                  {t.disabilities.map((item, index) => (
                    <label key={item} className="flex items-center gap-3 text-sm">
                      <input type="checkbox" defaultChecked={index < 2} className="h-4 w-4 rounded-none border-input text-primary" />
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
                    className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-base focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[3px]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="province" className="text-sm font-medium">
                    {t.area}
                  </label>
                  <Select
                    defaultValue={locale === 'en' ? 'Hanoi' : 'Hà Nội'}
                    items={t.provinces.map((item) => ({ value: item, label: item }))}
                  >
                    <SelectTrigger
                      id="province"
                      aria-label={t.area}
                      className="h-12 w-full rounded-none border-2 border-[#0b0c0c] bg-background px-4 text-base shadow-none focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0"
                    >
                      <SelectValue placeholder={locale === 'en' ? 'Hanoi' : 'Hà Nội'} />
                    </SelectTrigger>
                    <SelectContent
                      side="bottom"
                      align="start"
                      sideOffset={4}
                      alignItemWithTrigger={false}
                      className="w-[min(max(var(--anchor-width),20rem),calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0"
                    >
                      {t.provinces.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="flex h-10 cursor-pointer items-center rounded-none px-4 text-base leading-none text-[#0b0c0c] data-highlighted:bg-[#ffdd00] data-highlighted:text-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:outline-none"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-none border border-dashed bg-muted/40 p-4">
                <p className="flex items-center gap-2 text-sm font-medium">
                  <Layers3 className="h-4 w-4 text-primary" aria-hidden="true" />
                  {t.noteTitle}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{t.note}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className={buttonVariants({
                    variant: 'outline',
                    className:
                      'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                  })}
                >
                  {t.draft}
                </button>
                <button
                  type="button"
                  className={buttonVariants({
                    variant: 'default',
                    className:
                      'h-11 rounded-none border-primary bg-primary px-4 text-sm font-semibold text-[#0b0c0c] hover:bg-[#ffdd00] hover:text-[#0b0c0c] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c]',
                  })}
                >
                  {t.submit}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:sticky lg:top-24">
          <Card className="rounded-none border border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{t.checklistTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {t.checklist.map((item) => (
                <div key={item} className="flex gap-3 rounded-none border bg-background p-3">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-none border border-border shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Briefcase className="h-5 w-5 text-primary" aria-hidden="true" />
                {t.previewTitle}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-none border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{t.previewTitleLabel}</p>
                <p className="mt-1 font-semibold">{locale === 'en' ? 'Content specialist' : 'Chuyên viên nội dung số'}</p>
              </div>
              <div className="rounded-none border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{t.previewDeadline}</p>
                <p className="mt-1 flex items-center gap-2 font-semibold">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  30/06/2026
                </p>
              </div>
              <div className="rounded-none border bg-background p-4">
                <p className="text-sm font-medium text-muted-foreground">{t.previewPreview}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.previewNote}</p>
              </div>
              <Link
                href="/employer/dashboard"
                className={buttonVariants({
                  variant: 'outline',
                  className:
                    'h-11 w-full rounded-none border-[#0b0c0c] bg-white text-[#0b0c0c] hover:bg-[#ececec] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                })}
              >
                <Eye className="mr-2 h-4 w-4" aria-hidden="true" />
                {t.back}
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
      </main>
    </EmployerRouteGate>
  );
}
