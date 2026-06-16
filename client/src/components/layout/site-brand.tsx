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
        'group inline-flex w-fit max-w-full items-center gap-2 rounded-none px-0 py-0 font-bold uppercase tracking-tight transition-[color,text-decoration-thickness,background-color] duration-150 sm:gap-3',
        isInverse
          ? 'bg-transparent text-white hover:text-white hover:underline hover:decoration-white focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:underline focus-visible:decoration-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0'
          : 'bg-transparent text-[#0b0c0c] hover:text-[#0b0c0c] hover:underline hover:decoration-[2px] hover:decoration-[#0b0c0c] focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:underline focus-visible:decoration-[2px] focus-visible:decoration-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0',
        className
      )}
      aria-label="AccessJobs VN"
    >
      <span className="text-xl leading-none sm:text-2xl">AccessJobs</span>
      <span
        className={cn(
          'text-xl leading-none transition-colors duration-150 sm:text-2xl',
          isInverse ? 'text-[#00d7ff] group-focus-visible:text-[#0b0c0c]' : 'text-primary group-focus-visible:text-[#0b0c0c]'
        )}
      >
        •
      </span>
      <span className="text-xl leading-none sm:text-2xl">VN</span>
    </Link>
  );
}
