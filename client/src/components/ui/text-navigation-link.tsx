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
        'inline-flex items-center rounded-md px-1.5 py-1 text-[#1d70b8] underline decoration-[1px] underline-offset-4 decoration-[#1d70b8] transition-[color,text-decoration-thickness,background-color] duration-150 hover:text-[#003078] hover:decoration-[2px] hover:decoration-[#003078] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#003078] focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:text-[#003078] focus-visible:decoration-[2px] focus-visible:decoration-[#003078]',
        current && 'text-[#003078] decoration-[2px] decoration-[#003078]',
        className
      )}
      {...props}
    />
  );
}
