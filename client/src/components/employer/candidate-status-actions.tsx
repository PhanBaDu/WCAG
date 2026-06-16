'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Clock3, UserRoundX } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CandidateStatusActionsProps = {
  locale: 'vi' | 'en';
};

type CandidateStatus = 'reviewed' | 'interview' | 'rejected';

const LABELS = {
  vi: {
    title: 'Đổi trạng thái nhanh',
    note: 'Dùng để cập nhật luồng xử lý hồ sơ ngay trong inbox.',
    reviewed: 'Đã xem',
    interview: 'Mời phỏng vấn',
    rejected: 'Loại',
    current: 'Trạng thái hiện tại',
  },
  en: {
    title: 'Quick status update',
    note: 'Update the application flow directly from the inbox.',
    reviewed: 'Viewed',
    interview: 'Invite',
    rejected: 'Reject',
    current: 'Current status',
  },
} as const;

const STATUS_META: Record<CandidateStatus, { icon: typeof CheckCircle2; tone: string }> = {
  reviewed: { icon: CheckCircle2, tone: 'border-[#0b0c0c] bg-white text-[#0b0c0c]' },
  interview: { icon: Clock3, tone: 'border-[#0b0c0c] bg-[#ffdd00] text-[#0b0c0c]' },
  rejected: { icon: UserRoundX, tone: 'border-[#0b0c0c] bg-[#f6d7d2] text-[#0b0c0c]' },
};

export function CandidateStatusActions({ locale }: CandidateStatusActionsProps) {
  const labels = LABELS[locale];
  const [currentStatus, setCurrentStatus] = useState<CandidateStatus>('reviewed');

  const currentMeta = useMemo(() => STATUS_META[currentStatus], [currentStatus]);
  const CurrentIcon = currentMeta.icon;

  return (
    <div className="rounded-none border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="font-medium text-foreground">{labels.title}</p>
          <p className="text-sm text-muted-foreground">{labels.note}</p>
        </div>
        <span className={cn('inline-flex items-center gap-2 rounded-none border px-3 py-1 text-xs font-semibold', currentMeta.tone)}>
          <CurrentIcon className="h-4 w-4" aria-hidden="true" />
          {labels.current}: {currentStatus === 'reviewed' ? labels.reviewed : currentStatus === 'interview' ? labels.interview : labels.rejected}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {(
          [
            ['reviewed', labels.reviewed],
            ['interview', labels.interview],
            ['rejected', labels.rejected],
          ] as const
        ).map(([status, label]) => {
          const selected = currentStatus === status;
          return (
            <button
              key={status}
              type="button"
              onClick={() => setCurrentStatus(status)}
              className={buttonVariants({
                variant: selected ? 'default' : 'outline',
                className: cn(
                  'h-12 rounded-none px-4 text-sm font-medium focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                  selected && status === 'interview' && 'bg-[#ffdd00] text-[#0b0c0c] hover:bg-[#ffe766]',
                  selected && status === 'rejected' && 'bg-[#f6d7d2] text-[#0b0c0c] hover:bg-[#efb8b0]',
                  selected && status === 'reviewed' && 'bg-white text-[#0b0c0c] hover:bg-[#ececec]'
                ),
              })}
              aria-pressed={selected}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
