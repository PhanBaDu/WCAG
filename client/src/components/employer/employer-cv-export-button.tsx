'use client';

import { ReactNode } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type EmployerCvExportButtonProps = {
  href: string;
  children: ReactNode;
};

export function EmployerCvExportButton({ href, children }: EmployerCvExportButtonProps) {
  const scrollTableToEnd = () => {
    const table = document.querySelector<HTMLElement>('[data-employer-cv-table-scroll]');
    if (!table) {
      return;
    }

    table.scrollLeft = table.scrollWidth;
  };

  return (
    <a
      href={href}
      download
      onFocus={scrollTableToEnd}
      className={cn(
        buttonVariants({
          className:
            'h-11 rounded-none border-[#0b0c0c] px-6 text-sm font-semibold text-[#0b0c0c] focus-visible:border-[#ffdd00] focus-visible:!outline focus-visible:!outline-[3px] focus-visible:!outline-offset-[3px] focus-visible:!outline-[#ffdd00]',
        })
      )}
    >
      {children}
    </a>
  );
}
