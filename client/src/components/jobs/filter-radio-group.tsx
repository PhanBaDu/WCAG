'use client';

import { useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type FilterRadioOption = {
  value: string;
  label: string;
};

type FilterRadioGroupProps = {
  legend: ReactNode;
  name: string;
  options: FilterRadioOption[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  legendClassName?: string;
};

export function FilterRadioGroup({
  legend,
  name,
  options,
  defaultValue,
  value: controlledValue,
  onValueChange,
  className,
  legendClassName,
}: FilterRadioGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? options[0]?.value ?? '');
  const value = controlledValue ?? uncontrolledValue;

  const setValue = (nextValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
  };
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectAndFocus = (index: number) => {
    const option = options[index];
    if (!option) {
      return;
    }

    setValue(option.value);
    buttonRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      setValue(options[index]?.value ?? '');
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      selectAndFocus((index + 1) % options.length);
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectAndFocus((index - 1 + options.length) % options.length);
    }
  };

  return (
    <fieldset className={cn('space-y-3', className)}>
      <legend className={cn('text-sm font-semibold', legendClassName)}>{legend}</legend>
      {options.map((option, index) => {
        const checked = value === option.value;

        return (
          <button
            key={option.value}
            ref={(element) => {
              buttonRefs.current[index] = element;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={0}
            className="filter-option group flex w-full cursor-pointer items-center gap-3 rounded-none border-0 bg-transparent p-0 text-left text-sm text-[#0b0c0c] focus-visible:outline-none focus-visible:ring-0"
            onClick={() => setValue(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span
              aria-hidden="true"
              className="filter-control inline-flex shrink-0 items-center justify-center rounded-full"
            >
              {checked ? <span className="filter-control-dot h-2.5 w-2.5 rounded-full" aria-hidden="true" /> : null}
            </span>
            <span className="filter-option-text">{option.label}</span>
          </button>
        );
      })}
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}
