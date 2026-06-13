'use client';

import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type PasswordInputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'type'> & {
  showPasswordLabel: string;
  hidePasswordLabel: string;
};

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { className, showPasswordLabel, hidePasswordLabel, id, ...props },
  ref
) {
  const [visible, setVisible] = useState(false);
  const toggleId = id ? `${id}-toggle` : undefined;

  return (
    <div className="gov-input-wrap relative">
      <input
        ref={ref}
        id={id}
        type={visible ? 'text' : 'password'}
        className={cn('gov-input h-12 w-full rounded-lg px-4 pr-12 text-base', className)}
        {...props}
      />
      <button
        id={toggleId}
        type="button"
        aria-label={visible ? hidePasswordLabel : showPasswordLabel}
        aria-pressed={visible}
        aria-controls={id}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-2"
        onClick={() => setVisible((current) => !current)}
      >
        {visible ? (
          <EyeOff className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Eye className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </div>
  );
});
