'use client';

import { useState } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CandidateStatusActionsProps = {
  initialStatus: 'Tiếp nhận' | 'Đã xem' | 'Duyệt hồ sơ' | 'Cân nhắc' | 'Phù hợp' | 'Chưa phù hợp';
};

const STATUS_STAGES = ['Tiếp nhận', 'Đã xem', 'Duyệt hồ sơ', 'Cân nhắc', 'Phù hợp', 'Chưa phù hợp'] as const;

type CandidateStatus = (typeof STATUS_STAGES)[number];

export function CandidateStatusActions({ initialStatus }: CandidateStatusActionsProps) {
  const [currentStatus, setCurrentStatus] = useState<CandidateStatus>(initialStatus);

  return (
    <div className="flex flex-wrap gap-2">
      {STATUS_STAGES.map((status) => {
        const selected = currentStatus === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => setCurrentStatus(status)}
            className={buttonVariants({
              variant: selected ? 'default' : 'outline',
              className: cn(
                'h-11 rounded-none px-3 text-xs font-semibold focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
                selected && 'bg-[#ffdd00] text-[#0b0c0c] hover:bg-[#ffe766]'
              ),
            })}
            aria-pressed={selected}
          >
            {status}
          </button>
        );
      })}
    </div>
  );
}
