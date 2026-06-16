'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppliedJobsTabsProps = {
  locale: 'vi' | 'en';
};

type AppliedJobTabKey =
  | 'all'
  | 'received'
  | 'reviewed'
  | 'screening'
  | 'considering'
  | 'matched'
  | 'rejected';

type AppliedJobTab = {
  key: AppliedJobTabKey;
  label: string;
};

const TABS: Record<'vi' | 'en', AppliedJobTab[]> = {
  vi: [
    { key: 'all', label: 'Tất cả' },
    { key: 'received', label: 'Tiếp nhận' },
    { key: 'reviewed', label: 'Đã xem' },
    { key: 'screening', label: 'Duyệt hồ sơ' },
    { key: 'considering', label: 'Cân nhắc' },
    { key: 'matched', label: 'Phù hợp' },
    { key: 'rejected', label: 'Chưa phù hợp' },
  ],
  en: [
    { key: 'all', label: 'All' },
    { key: 'received', label: 'Received' },
    { key: 'reviewed', label: 'Viewed' },
    { key: 'screening', label: 'Screening' },
    { key: 'considering', label: 'Considering' },
    { key: 'matched', label: 'Matched' },
    { key: 'rejected', label: 'Not suitable' },
  ],
};

function getActiveTab(value: string | null): AppliedJobTabKey {
  const valid = new Set<AppliedJobTabKey>(['all', 'received', 'reviewed', 'screening', 'considering', 'matched', 'rejected']);
  return value && valid.has(value as AppliedJobTabKey) ? (value as AppliedJobTabKey) : 'all';
}

export function AppliedJobsTabs({ locale }: AppliedJobsTabsProps) {
  const tabs = TABS[locale];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeTab = useMemo(() => getActiveTab(searchParams.get('status')), [searchParams]);

  const setTab = (nextTab: AppliedJobTabKey) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTab === 'all') {
      params.delete('status');
    } else {
      params.set('status', nextTab);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const selected = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => setTab(tab.key)}
            className={cn(
              buttonVariants({
                variant: 'outline',
                className: 'h-11 rounded-none px-4 text-[17px] font-normal text-[#0b0c0c] shadow-none',
              }),
              selected
                ? 'border-t-[#0b0c0c] border-l-[#0b0c0c] border-r-[#0b0c0c] border-b-[#ffdd00] bg-white text-[#0b0c0c] hover:border-t-[#0b0c0c] hover:border-l-[#0b0c0c] hover:border-r-[#0b0c0c] hover:border-b-[#ffdd00] hover:bg-white'
                : 'hover:border-[#0b0c0c] hover:text-[#0b0c0c]'
            )}
            aria-pressed={selected}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
