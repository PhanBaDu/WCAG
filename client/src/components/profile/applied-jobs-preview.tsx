'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, MapPin } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Link } from '@/i18n/routing';
import { getCompanyLogoAlt, getCompanyLogoSrc } from '@/lib/jobs/company-logo';

type AppliedJobsPreviewProps = {
  locale: 'vi' | 'en';
};

type StatusKey = 'all' | 'received' | 'reviewed' | 'screening' | 'considering' | 'matched' | 'rejected';

type MockApplication = {
  key: StatusKey;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedAt: string;
  noteVi: string;
  noteEn: string;
  statusVi: string;
  statusEn: string;
  slug: string;
  tags: string[];
};

const APPLICATIONS: MockApplication[] = [
  {
    key: 'received',
    title: 'Chuyên viên CSKH qua điện thoại',
    company: 'Tập đoàn Nhân Ái Logistics',
    location: 'Đà Nẵng',
    salary: 'Trên 20 triệu',
    appliedAt: '12/06/2026',
    noteVi: 'Hồ sơ đã được tiếp nhận, đang chờ bộ phận nhân sự xem xét lượt đầu.',
    noteEn: 'Your application has been received and is waiting for the first HR review.',
    statusVi: 'Đã tiếp nhận',
    statusEn: 'Received',
    slug: 'chuyen-vien-cskh-qua-ien-thoai-2',
    tags: ['Phù hợp người khiếm thị', 'Làm việc từ xa', 'Đào tạo quy trình rõ'],
  },
  {
    key: 'reviewed',
    title: 'Nhân viên telesales',
    company: 'Công ty Tiến Phát Thương mại',
    location: 'Cần Thơ',
    salary: 'Thỏa thuận',
    appliedAt: '11/06/2026',
    noteVi: 'Nhà tuyển dụng đã mở hồ sơ của bạn và chuyển sang bước đánh giá.',
    noteEn: 'The employer has opened your profile and moved it to review.',
    statusVi: 'Đã xem',
    statusEn: 'Viewed',
    slug: 'nhan-vien-telesales-3',
    tags: ['Làm việc qua tai nghe', 'Phù hợp người khiếm thị', 'Làm việc từ xa'],
  },
  {
    key: 'screening',
    title: 'Trợ lý hành chính',
    company: 'Công ty Cổ phần Phương Nam',
    location: 'TP. Hồ Chí Minh',
    salary: '10 - 15 triệu',
    appliedAt: '10/06/2026',
    noteVi: 'Bộ phận tuyển dụng đang đối chiếu kỹ năng và kinh nghiệm với yêu cầu tin.',
    noteEn: 'Recruitment is screening your skills and experience against the posting.',
    statusVi: 'Duyệt hồ sơ',
    statusEn: 'Screening',
    slug: 'tro-ly-hanh-chinh-16',
    tags: ['Excel', 'Giao tiếp bằng văn bản', 'Tài liệu hóa đầy đủ'],
  },
  {
    key: 'considering',
    title: 'Chuyên viên nội dung',
    company: 'Công ty Cổ phần Green Life Công nghệ',
    location: 'Hà Nội',
    salary: 'Thỏa thuận',
    appliedAt: '09/06/2026',
    noteVi: 'Hồ sơ phù hợp, nhà tuyển dụng đang cân nhắc đặt lịch phỏng vấn vòng đầu.',
    noteEn: 'Your profile fits well and the employer is considering a first-round interview.',
    statusVi: 'Cân nhắc',
    statusEn: 'Considering',
    slug: 'chuyen-vien-noi-dung-21',
    tags: ['Tài liệu hóa đầy đủ', 'Phù hợp người khiếm thị', 'Làm việc từ xa'],
  },
  {
    key: 'matched',
    title: 'Chuyên viên kiểm thử accessibility',
    company: 'Tập đoàn NovaLink Tài chính',
    location: 'Đà Nẵng',
    salary: '10 - 15 triệu',
    appliedAt: '08/06/2026',
    noteVi: 'Tin này khớp mạnh với hồ sơ của bạn, đang chờ phản hồi lịch làm việc.',
    noteEn: 'This posting is a strong match and is waiting on schedule confirmation.',
    statusVi: 'Phù hợp',
    statusEn: 'Matched',
    slug: 'chuyen-vien-kiem-thu-accessibility-10',
    tags: ['Screen reader friendly', 'Remote friendly', 'Phù hợp người khiếm thị'],
  },
  {
    key: 'rejected',
    title: 'Lập trình viên Backend',
    company: 'Công ty Bắc Việt Dịch vụ',
    location: 'Làm từ xa',
    salary: 'Trên 20 triệu',
    appliedAt: '07/06/2026',
    noteVi: 'Tin đã phản hồi rằng yêu cầu chuyên môn vượt mức hiện tại của hồ sơ.',
    noteEn: 'The employer replied that the required expertise is above the current profile.',
    statusVi: 'Chưa phù hợp',
    statusEn: 'Not suitable',
    slug: 'lap-trinh-vien-backend-7',
    tags: ['Remote friendly', 'Phù hợp người khiếm thị', 'Làm việc từ xa'],
  },
  {
    key: 'all',
    title: 'Nhân viên tổng đài',
    company: 'Công ty TNHH Đại Dương Xanh Truyền thông',
    location: 'TP. Hồ Chí Minh',
    salary: '15 - 20 triệu',
    appliedAt: '12/06/2026',
    noteVi: 'Hồ sơ đã được tiếp nhận, đang chờ bộ phận nhân sự xem xét lượt đầu.',
    noteEn: 'Your application has been received and is waiting for the first HR review.',
    statusVi: 'Tất cả',
    statusEn: 'All',
    slug: 'nhan-vien-tong-ai-1',
    tags: ['Không yêu cầu thị lực', 'Phù hợp người khiếm thị', 'Làm việc từ xa'],
  },
];

function getStatusFromQuery(value: string | null): StatusKey {
  const valid = new Set<StatusKey>(['all', 'received', 'reviewed', 'screening', 'considering', 'matched', 'rejected']);
  return value && valid.has(value as StatusKey) ? (value as StatusKey) : 'all';
}

export function AppliedJobsPreview({ locale }: AppliedJobsPreviewProps) {
  const searchParams = useSearchParams();
  const activeStatus = getStatusFromQuery(searchParams.get('status'));

  const currentItem = useMemo(() => {
    const matched = APPLICATIONS.find((application) => application.key === activeStatus);
    return matched ?? APPLICATIONS[APPLICATIONS.length - 1];
  }, [activeStatus]);

  const statusLabel = locale === 'vi' ? currentItem.statusVi : currentItem.statusEn;
  const note = locale === 'vi' ? currentItem.noteVi : currentItem.noteEn;
  const logoSrc = getCompanyLogoSrc(currentItem.company);
  const logoAlt = getCompanyLogoAlt(currentItem.company);

  return (
    <div className="mt-8">
      <Card className="rounded-none border border-slate-200 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.04)] transition-colors focus-within:border-[#ffdd00]">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden border border-slate-200 bg-white">
                <Image src={logoSrc} alt={logoAlt} width={72} height={72} className="h-16 w-16 object-contain p-1" />
              </div>

              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-none border border-[#0b0c0c] bg-white px-2.5 py-1 text-xs font-medium text-[#0b0c0c]">
                    {statusLabel}
                  </span>
                  <span className="inline-flex items-center rounded-none border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-[#0b0c0c]">
                    {currentItem.location}
                  </span>
                  <span className="inline-flex items-center rounded-none border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-[#0b0c0c]">
                    {locale === 'vi' ? 'Dưới 1 năm' : 'Entry level'}
                  </span>
                </div>

                <CardTitle className="text-xl font-semibold text-slate-950 sm:text-[1.375rem]">{currentItem.title}</CardTitle>
                <p className="text-sm uppercase tracking-[0.08em] text-slate-500">{currentItem.company}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {currentItem.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-sm text-slate-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
              <p className="text-lg font-semibold text-slate-950">{currentItem.salary}</p>
              <p className="inline-flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {currentItem.appliedAt}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-4">
            <Link
              href={`/jobs/${currentItem.slug}`}
              className={buttonVariants({
                variant: 'outline',
                className:
                  'h-11 min-w-[9.5rem] rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-normal text-[#0b0c0c] shadow-none hover:bg-[#ececec] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c]',
              })}
            >
              {locale === 'vi' ? 'Xem tin' : 'View job'}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/jobs"
              className={buttonVariants({
                variant: 'outline',
                className:
                  'h-11 min-w-[9.5rem] rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-normal text-[#0b0c0c] shadow-none hover:bg-[#ececec] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c]',
              })}
            >
              {locale === 'vi' ? 'Tìm việc khác' : 'Find other jobs'}
            </Link>
          </div>

          <p className="mt-4 text-sm leading-7 text-slate-600">{note}</p>
        </CardContent>
      </Card>
    </div>
  );
}
