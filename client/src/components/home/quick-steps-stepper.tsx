import { cn } from '@/lib/utils';

export type QuickStep = {
  title: string;
  description: string;
};

type QuickStepRowProps = {
  step: QuickStep;
  index: number;
  isLast: boolean;
  className?: string;
};

export function QuickStepRow({ step, index, isLast, className }: QuickStepRowProps) {
  return (
    <div className={cn('relative flex items-start gap-4', className)}>
      <div className="relative flex w-11 shrink-0 self-stretch justify-center">
        {!isLast ? (
          <span
            className="absolute top-11 -bottom-8 left-1/2 w-0.5 -translate-x-1/2 bg-primary/25"
            aria-hidden="true"
          />
        ) : null}
        <span
          className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-primary text-base font-semibold text-primary-foreground"
          aria-hidden="true"
        >
          {index + 1}
        </span>
      </div>

      <div className="min-w-0 flex-1 pt-1">
        <h3 className="font-semibold text-foreground">{step.title}</h3>
        <p className="mt-1 text-base leading-relaxed text-muted-foreground">{step.description}</p>
      </div>
    </div>
  );
}

type QuickStepsStepperProps = {
  steps: readonly QuickStep[];
};

export function QuickStepsStepper({ steps }: QuickStepsStepperProps) {
  return (
    <ol className="mt-6">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li key={step.title} className={cn('relative', !isLast && 'pb-8')}>
            <QuickStepRow step={step} index={index} isLast={isLast} />
          </li>
        );
      })}
    </ol>
  );
}
