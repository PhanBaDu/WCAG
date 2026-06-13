import { Check } from 'lucide-react';

type FieldRequiredIndicatorProps = {
  complete: boolean;
  requiredLabel: string;
  completeLabel: string;
};

export function FieldRequiredIndicator({
  complete,
  requiredLabel,
  completeLabel,
}: FieldRequiredIndicatorProps) {
  if (complete) {
    return (
      <>
        <Check className="ml-1 inline h-4 w-4 align-text-bottom text-[#00703c]" aria-hidden="true" />
        <span className="sr-only">{completeLabel}</span>
      </>
    );
  }

  return (
    <>
      <span aria-hidden="true" className="text-destructive">
        {' '}
        *
      </span>
      <span className="sr-only">{requiredLabel}</span>
    </>
  );
}
