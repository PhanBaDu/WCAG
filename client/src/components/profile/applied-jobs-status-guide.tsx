'use client';

import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type AppliedJobsStatusGuideProps = {
  locale: 'vi' | 'en';
};

type StatusGuideItem = {
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
};

const STATUS_GUIDE_ITEMS: StatusGuideItem[] = [
  {
    titleVi: 'Đã tiếp nhận',
    titleEn: 'Received',
    descVi: 'Hồ sơ đã vào hệ thống, đang chờ bộ phận nhân sự xem xét lượt đầu.',
    descEn: 'Your application is in the system and waiting for the first HR review.',
  },
  {
    titleVi: 'Đã xem',
    titleEn: 'Viewed',
    descVi: 'Nhà tuyển dụng đã mở hồ sơ của bạn và đang đánh giá chi tiết.',
    descEn: 'The employer has opened your profile and is reviewing the details.',
  },
  {
    titleVi: 'Duyệt hồ sơ',
    titleEn: 'Screening',
    descVi: 'Bộ phận tuyển dụng đang đối chiếu kỹ năng và kinh nghiệm với yêu cầu tin.',
    descEn: 'Recruitment is screening your skills and experience against the posting.',
  },
  {
    titleVi: 'Cân nhắc',
    titleEn: 'Considering',
    descVi: 'Hồ sơ phù hợp, nhà tuyển dụng đang cân nhắc phỏng vấn hoặc bước tiếp theo.',
    descEn: 'Your profile fits well and the employer is considering the next step.',
  },
  {
    titleVi: 'Phù hợp',
    titleEn: 'Matched',
    descVi: 'Tin này khớp mạnh với hồ sơ của bạn và đang chờ phản hồi lịch làm việc.',
    descEn: 'This posting is a strong match and is waiting on schedule confirmation.',
  },
  {
    titleVi: 'Chưa phù hợp',
    titleEn: 'Not suitable',
    descVi: 'Tin đã phản hồi rằng yêu cầu hiện tại vượt mức hồ sơ hoặc không khớp.',
    descEn: 'The employer replied that the role is not a fit for the current profile.',
  },
];

export function AppliedJobsStatusGuide({ locale }: AppliedJobsStatusGuideProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cn(
          buttonVariants({
            variant: 'outline',
            className: 'h-11 rounded-none border-[#0b0c0c] bg-white px-4 text-sm font-medium text-[#0b0c0c] hover:bg-[#ececec]',
          })
        )}
        onClick={() => setOpen(true)}
      >
        {locale === 'vi' ? 'Xem trạng thái' : 'Status guide'}
      </button>

      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);
        }}
      >
        <DialogContent className="max-w-[calc(100vw-1rem)] rounded-none border-2 border-[#0b0c0c] p-5 shadow-none sm:max-w-2xl">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-2xl text-[#0b0c0c]">
              {locale === 'vi' ? 'Giải thích trạng thái hồ sơ' : 'Application status guide'}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-muted-foreground">
              {locale === 'vi'
                ? 'Mỗi trạng thái cho bạn biết hồ sơ đang ở bước nào trong quá trình tuyển dụng.'
                : 'Each status shows where your application is in the hiring process.'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-3">
            {STATUS_GUIDE_ITEMS.map((item) => (
              <div key={item.titleVi} className="rounded-none border border-border bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-[#0b0c0c]">
                      {locale === 'vi' ? item.titleVi : item.titleEn}
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {locale === 'vi' ? item.descVi : item.descEn}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 rounded-none border border-[#0b0c0c] px-2.5 py-1 text-xs font-medium text-[#0b0c0c]">
                    {locale === 'vi' ? item.titleVi : item.titleEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
