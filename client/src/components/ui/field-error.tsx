import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type FieldErrorProps = {
  id: string;
  message: string;
  className?: string;
};

export function FieldError({ id, message, className }: FieldErrorProps) {
  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={cn('flex items-start gap-2 text-sm text-destructive', className)}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </p>
  );
}

type FormAlertProps = {
  id: string;
  message: string;
  className?: string;
};

export function FormAlert({ id, message, className }: FormAlertProps) {
  return (
    <div
      id={id}
      role="alert"
      aria-live="assertive"
      className={cn(
        'flex items-start gap-2 rounded-none border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive',
        className
      )}
    >
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
