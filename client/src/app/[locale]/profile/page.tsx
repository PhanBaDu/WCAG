import { Metadata } from 'next';
import { BadgeCheck, Briefcase, Heart, Settings, UploadCloud, User } from 'lucide-react';
import Image from 'next/image';
import { buttonVariants } from '@/components/ui/button';
import { PageBreadcrumb } from '@/components/layout/page-breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Hồ sơ cá nhân | Cổng Việc Làm Người Khuyết Tật',
  description: 'Giao diện tĩnh khu vực hồ sơ dành cho người tìm việc.',
};

const copy = {
  vi: {
    eyebrow: 'Hồ sơ cá nhân',
    title: 'Bố cục hồ sơ tĩnh cho người tìm việc',
    desc: 'Các section được chia rõ ràng để bạn kiểm tra điều hướng, thứ tự đọc và các trường nhập liệu cơ bản.',
    completionLabel: 'Độ hoàn thiện',
    completionNote: 'Mốc 60% là ngưỡng minh họa trước khi ứng tuyển.',
    tocTitle: 'Mục lục',
    helpTitle: 'Gợi ý thao tác',
    helpDesc: 'Bản tĩnh này ưu tiên cách đọc tuần tự, không yêu cầu user phải tương tác để hiểu nội dung.',
    helpCta: 'Tìm việc phù hợp',
    saveDraft: 'Lưu nháp',
    uploadCv: 'Tải CV',
    footerNote: 'Nút lưu thay đổi và upload CV chỉ là giao diện tĩnh để chốt vị trí, khoảng cách và kích thước tương tác.',
    sections: [
      {
        id: 'personal',
        icon: User,
        title: 'Thông tin cá nhân',
        items: [
          ['Họ và tên', 'Nguyễn Minh Anh'],
          ['Số điện thoại', '0901 234 567'],
          ['Ngày sinh', '12/05/1996'],
          ['Tỉnh / thành', 'Hà Nội'],
        ],
      },
      {
        id: 'disability',
        icon: Heart,
        title: 'Thông tin khuyết tật',
        items: [
          ['Dạng khuyết tật', 'Vận động, Thị giác'],
          ['Nhu cầu hỗ trợ', 'Lối đi không bậc thềm, lịch làm việc linh hoạt'],
          ['Giấy xác nhận', 'Đã tải lên'],
        ],
      },
      {
        id: 'experience',
        icon: Briefcase,
        title: 'Kỹ năng & kinh nghiệm',
        items: [
          ['Kỹ năng', 'Soạn thảo, nhập liệu, chăm sóc khách hàng'],
          ['CV', 'cv-nguyen-minh-anh.pdf'],
          ['Mục tiêu nghề nghiệp', 'Ứng tuyển các vị trí hành chính hoặc nội dung'],
        ],
      },
      {
        id: 'settings',
        icon: Settings,
        title: 'Cài đặt thông báo',
        items: [
          ['Việc làm phù hợp', 'Bật'],
          ['Cập nhật ứng tuyển', 'Bật'],
          ['Nhắc cập nhật hồ sơ', 'Tắt'],
        ],
      },
    ],
  },
  en: {
    eyebrow: 'Profile',
    title: 'Static profile layout for job seekers',
    desc: 'The sections are clearly separated so you can verify navigation, reading order, and basic inputs.',
    completionLabel: 'Completion',
    completionNote: 'The 60% mark is a mock threshold before applying.',
    tocTitle: 'Table of contents',
    helpTitle: 'Interaction notes',
    helpDesc: 'This static version prefers sequential reading and does not require interaction to understand the content.',
    helpCta: 'Find matching jobs',
    saveDraft: 'Save draft',
    uploadCv: 'Upload CV',
    footerNote: 'The save and upload actions are only placeholders so you can lock down spacing, placement, and target size.',
    sections: [
      {
        id: 'personal',
        icon: User,
        title: 'Personal information',
        items: [
          ['Full name', 'Nguyen Minh Anh'],
          ['Phone number', '0901 234 567'],
          ['Date of birth', '12/05/1996'],
          ['Province / city', 'Hanoi'],
        ],
      },
      {
        id: 'disability',
        icon: Heart,
        title: 'Disability information',
        items: [
          ['Disability type', 'Mobility, Visual'],
          ['Support needs', 'Step-free access, flexible schedule'],
          ['Certificate', 'Uploaded'],
        ],
      },
      {
        id: 'experience',
        icon: Briefcase,
        title: 'Skills & experience',
        items: [
          ['Skills', 'Writing, data entry, customer support'],
          ['CV', 'cv-nguyen-minh-anh.pdf'],
          ['Career goal', 'Apply to admin or content roles'],
        ],
      },
      {
        id: 'settings',
        icon: Settings,
        title: 'Notification settings',
        items: [
          ['Matching jobs', 'On'],
          ['Application updates', 'On'],
          ['Profile reminders', 'Off'],
        ],
      },
    ],
  },
} as const;

export default async function ProfilePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: routeLocale } = await params;
  const locale = routeLocale === 'en' ? 'en' : 'vi';
  const t = copy[locale];
  const crumbs = locale === 'en'
    ? [
        { label: 'Home', href: '/' },
        { label: 'Profile' },
      ]
    : [
        { label: 'Trang chủ', href: '/' },
        { label: 'Hồ sơ' },
      ];
  return (
    <main id="main-content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <PageBreadcrumb items={crumbs} />
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
          <p className="mt-4 text-muted-foreground">{t.desc}</p>
        </div>

        <div className="w-full max-w-sm rounded-3xl border bg-card p-5 shadow-sm">
          <div className="relative min-h-[180px] overflow-hidden rounded-2xl bg-slate-50">
            <Image
              src="/career-change-rockets.svg"
              alt={locale === 'en' ? 'Career change and job search illustration' : 'Minh hoạ chuyển nghề và tìm việc'}
              fill
              sizes="(max-width: 768px) 100vw, 28vw"
              className="object-contain p-4"
            />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {locale === 'en' ? 'Career support' : 'Hỗ trợ nghề nghiệp'}
            </p>
            <p className="mt-1 text-sm font-semibold">{locale === 'en' ? 'Guided job search' : 'Tìm việc có định hướng'}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              {locale === 'en'
                ? 'A visual cue for users who are updating their profile and preparing to apply.'
                : 'Một tín hiệu trực quan cho người dùng đang cập nhật hồ sơ và chuẩn bị ứng tuyển.'}
            </p>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm font-medium">
            <span>{t.completionLabel}</span>
            <span>72%</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-muted">
            <div className="h-3 w-[72%] rounded-full bg-primary" />
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{t.completionNote}</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-4">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">{t.tocTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {t.sections.map((section) => {
                const Icon = section.icon;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    {section.title}
                  </a>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border-none bg-primary/5 shadow-none">
            <CardContent className="space-y-4 p-6 text-sm">
              <div className="flex items-center gap-2 font-semibold">
                <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                {t.helpTitle}
              </div>
              <p className="text-muted-foreground">{t.helpDesc}</p>
              <Link href="/jobs" className={buttonVariants({ className: 'h-11 w-full rounded-xl' })}>
                {t.helpCta}
              </Link>
            </CardContent>
          </Card>
        </aside>

        <section className="space-y-6">
          {t.sections.map((section) => {
            const Icon = section.icon;

            return (
              <Card key={section.id} id={section.id} className="border-none shadow-lg">
                <CardHeader className="flex flex-row items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{section.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {section.items.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border bg-background p-4">
                      <p className="text-sm font-medium text-muted-foreground">{label}</p>
                      <p className="mt-2 text-sm leading-relaxed">{value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-dashed">
            <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">{t.footerNote}</p>
              <div className="flex gap-3">
                <Link href="/profile" className={buttonVariants({ variant: 'outline', className: 'h-11 rounded-xl' })}>
                  {t.saveDraft}
                </Link>
                <button type="button" className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground">
                  <UploadCloud className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t.uploadCv}
                </button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
