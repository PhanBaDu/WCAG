'use client';

import { useId, useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterCollapsibleSectionProps = {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function FilterSectionDivider({ className }: { className?: string } = {}) {
  return <hr className={cn('gov-section-divider my-4', className)} aria-hidden="true" />;
}

export function FilterCollapsibleSection({
  label,
  children,
  defaultOpen = false,
  className,
}: FilterCollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const triggerId = useId();

  return (
    <div className={className}>
      <FilterSectionDivider className="mt-0" />
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((current) => !current)}
        className="filter-option group flex w-full cursor-pointer items-center justify-between gap-3 rounded-none border-0 bg-transparent p-0 text-left text-sm font-semibold text-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0"
      >
        <span className="filter-option-text flex items-center gap-2">{label}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!open}
        className="mt-3 space-y-3"
      >
        {children}
      </div>
    </div>
  );
}
