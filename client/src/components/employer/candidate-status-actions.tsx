'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CandidateStatusActionsProps = {
  initialStatus: 'Tiếp nhận' | 'Đã xem' | 'Duyệt hồ sơ' | 'Cân nhắc' | 'Phù hợp' | 'Chưa phù hợp';
};

const STATUS_STAGES = ['Tiếp nhận', 'Đã xem', 'Duyệt hồ sơ', 'Cân nhắc', 'Phù hợp', 'Chưa phù hợp'] as const;

type CandidateStatus = (typeof STATUS_STAGES)[number];

export function CandidateStatusActions({ initialStatus }: CandidateStatusActionsProps) {
  const [currentStatus, setCurrentStatus] = useState<CandidateStatus>(initialStatus);

  return (
    <Select value={currentStatus} onValueChange={(value) => setCurrentStatus(value as CandidateStatus)}>
      <SelectTrigger
        aria-label="Trạng thái ứng viên"
        className="h-11 w-full min-w-[9rem] rounded-none border-2 border-[#0b0c0c] bg-background px-3 text-xs font-semibold text-foreground shadow-none focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00] focus-visible:ring-0"
      >
        <SelectValue placeholder={currentStatus} />
      </SelectTrigger>
      <SelectContent className="w-[min(max(var(--anchor-width),12rem),calc(100vw-1rem))] max-w-[calc(100vw-1rem)] rounded-none border-2 border-[#0b0c0c] bg-white p-1 shadow-none ring-0">
        {STATUS_STAGES.map((status) => (
          <SelectItem
            key={status}
            value={status}
            className="h-10 rounded-none px-4 text-sm font-medium text-[#0b0c0c] data-highlighted:bg-[#ffdd00] data-highlighted:text-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:outline-none"
          >
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
