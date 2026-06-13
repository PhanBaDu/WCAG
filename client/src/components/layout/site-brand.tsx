import { Accessibility } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type SiteBrandProps = {
  href?: string;
  className?: string;
  tone?: 'solid' | 'inline' | 'inverse';
};

export function SiteBrand({ href = '/', className, tone = 'solid' }: SiteBrandProps) {
  const isSolid = tone === 'solid';
  const isInverse = tone === 'inverse';

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-3 rounded-none border border-[#0b0c0c] px-4 py-2 font-bold tracking-tight transition-colors',
        isSolid
          ? 'bg-[#1d70b8] text-white hover:bg-[#003078]'
          : isInverse
            ? 'bg-transparent border-transparent text-white hover:bg-white/10'
          : 'bg-transparent text-foreground hover:bg-muted/40',
        className
      )}
      aria-label="AccessJobs VN"
    >
      <Accessibility className={cn('h-6 w-6', isSolid || isInverse ? 'text-white' : 'text-primary')} aria-hidden="true" />
      <span className="text-lg leading-none">AccessJobs</span>
      <span className={cn('text-lg leading-none', isSolid || isInverse ? 'text-[#00d7ff]' : 'text-primary')}>•</span>
      <span className="text-lg leading-none">VN</span>
    </Link>
  );
}
