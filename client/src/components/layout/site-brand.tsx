import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type SiteBrandProps = {
  href?: string;
  className?: string;
  tone?: 'solid' | 'inline' | 'inverse';
};

export function SiteBrand({ href = '/', className, tone = 'solid' }: SiteBrandProps) {
  const isInverse = tone === 'inverse';

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-3 rounded-none px-0 py-0 font-bold uppercase tracking-tight transition-[color,text-decoration-thickness,background-color] duration-150',
        isInverse
          ? 'bg-transparent border-transparent text-white hover:text-white focus-visible:bg-white/10 focus-visible:text-white focus-visible:underline focus-visible:decoration-white focus-visible:outline-none focus-visible:ring-0'
          : 'bg-transparent text-[#0b0c0c] hover:text-[#0b0c0c] hover:underline hover:decoration-[2px] hover:decoration-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0',
        className
      )}
      aria-label="AccessJobs VN"
    >
      <span className="text-2xl leading-none">AccessJobs</span>
      <span className={cn('text-2xl leading-none', isInverse ? 'text-[#00d7ff]' : 'text-primary')}>•</span>
      <span className="text-2xl leading-none">VN</span>
    </Link>
  );
}
