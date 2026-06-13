'use client';

import { LangToggle } from '@/components/lang-toggle';
import { useAuthQuery, useLogoutMutation } from '@/hooks/use-auth';
import { GovButtonLink } from '@/components/ui/gov-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type HeaderAuthActionsProps = {
  loginLabel: string;
  registerLabel: string;
  logoutLabel: string;
  profileLabel: string;
  className?: string;
};

export function HeaderAuthActions({
  loginLabel,
  registerLabel,
  logoutLabel,
  profileLabel,
  className,
}: HeaderAuthActionsProps) {
  const { data: user } = useAuthQuery();
  const { mutate: logout, isPending } = useLogoutMutation();

  if (user) {
    const displayName = user.fullName || user.companyName || user.email;

    return (
      <div className={cn('flex shrink-0 items-center gap-2', className)}>
        <LangToggle />
        <GovButtonLink href="/profile" size="sm" className="max-w-[12rem] truncate px-4">
          {profileLabel}: {displayName}
        </GovButtonLink>
        <button
          type="button"
          className={buttonVariants({ size: 'sm', className: 'shrink-0 px-4' })}
          onClick={() => logout()}
          disabled={isPending}
        >
          {logoutLabel}
        </button>
      </div>
    );
  }

  return (
    <div className={cn('flex shrink-0 items-center gap-2', className)}>
      <LangToggle />
      <GovButtonLink href="/login" size="sm" className="shrink-0 px-4">
        {loginLabel}
      </GovButtonLink>
      <GovButtonLink href="/register" size="sm" variant="default" className="shrink-0 px-4">
        {registerLabel}
      </GovButtonLink>
    </div>
  );
}
