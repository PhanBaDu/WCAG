import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type TextNavigationLinkProps = ComponentProps<typeof Link> & {
  current?: boolean;
};

export function TextNavigationLink({ className, current, ...props }: TextNavigationLinkProps) {
  return (
    <Link
      aria-current={current ? 'page' : undefined}
      className={cn(
        'inline-flex items-center rounded-none px-0 py-0 text-lg text-[#0b0c0c] underline decoration-[2px] underline-offset-4 decoration-[#0b0c0c] transition-[color,text-decoration-thickness,background-color] duration-150 hover:text-[#0b0c0c] hover:decoration-[4px] hover:decoration-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:decoration-[4px] focus-visible:decoration-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0',
        current && 'decoration-[#ffdd00]',
        className
      )}
      {...props}
    />
  );
}
