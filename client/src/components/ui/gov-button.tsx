import { Button, buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import type { ComponentProps, ReactNode } from 'react';
import type { VariantProps } from 'class-variance-authority';

type GovButtonProps = ComponentProps<typeof Button>;

export function GovButton({ className, variant = 'outline', size = 'default', ...props }: GovButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(className)}
      {...props}
    />
  );
}

type GovButtonLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export function GovButtonLink({ href, children, variant = 'outline', size = 'default', className }: GovButtonLinkProps) {
  return (
    <Link href={href} className={buttonVariants({ variant, size, className })}>
      {children}
    </Link>
  );
}
