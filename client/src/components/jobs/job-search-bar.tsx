'use client';

import type { FocusEvent, FormEvent, KeyboardEvent } from 'react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, MapPin, Search } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatSelectedLocations, type JobLocationOption } from '@/lib/jobs/job-locations';

type JobSearchBarLabels = {
  keywordLabel: string;
  keywordPlaceholder: string;
  locationLabel: string;
  locationPlaceholder: string;
  locationSearchPlaceholder: string;
  locationSelectedCount: (count: number) => string;
  clearLocation: string;
  applyLocation: string;
  searchButton: string;
};

type JobSearchBarProps = {
  query: string;
  locations: string[];
  locationOptions: JobLocationOption[];
  labels: JobSearchBarLabels;
  onQueryChange: (value: string) => void;
  onLocationsChange: (values: string[]) => void;
  onSubmit: () => void;
};

function normalize(value: string) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().trim();
}

function JobLocationSelect({
  value,
  locationOptions,
  labels,
  onChange,
}: {
  value: string[];
  locationOptions: JobLocationOption[];
  labels: Pick<
    JobSearchBarLabels,
    | 'locationLabel'
    | 'locationPlaceholder'
    | 'locationSearchPlaceholder'
    | 'locationSelectedCount'
    | 'clearLocation'
    | 'applyLocation'
  >;
  onChange: (values: string[]) => void;
}) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const filterRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [draft, setDraft] = useState<string[]>(value);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [listFocused, setListFocused] = useState(false);

  const triggerLabel = formatSelectedLocations(value, locationOptions, {
    placeholder: labels.locationPlaceholder,
    selectedCount: labels.locationSelectedCount,
  });

  const filteredLocations = useMemo(() => {
    const normalizedFilter = normalize(filter);
    if (!normalizedFilter) {
      return locationOptions;
    }
    return locationOptions.filter((option) => normalize(option.label).includes(normalizedFilter));
  }, [filter, locationOptions]);

  const activeOptionId =
    open && listFocused && activeIndex >= 0 && filteredLocations[activeIndex]
      ? `${listboxId}-option-${filteredLocations[activeIndex].value}`
      : undefined;

  const focusFilterInput = () => {
    window.requestAnimationFrame(() => filterRef.current?.focus());
  };

  useEffect(() => {
    if (open) {
      setDraft(value);
      setFilter('');
      setActiveIndex(-1);
      setListFocused(false);
    }
  }, [open, value]);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex >= filteredLocations.length) {
      setActiveIndex(filteredLocations.length > 0 ? filteredLocations.length - 1 : -1);
    }
  }, [activeIndex, filteredLocations.length]);

  useEffect(() => {
    if (!open || !listFocused || !activeOptionId) {
      return;
    }

    const activeElement = document.getElementById(activeOptionId);
    activeElement?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, activeOptionId, listFocused, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    return () => window.removeEventListener('mousedown', handlePointerDown);
  }, [open]);

  const toggleDraftLocation = (locationValue: string) => {
    setDraft((current) =>
      current.includes(locationValue)
        ? current.filter((item) => item !== locationValue)
        : [...current, locationValue],
    );
  };

  const toggleActiveLocation = () => {
    const activeOption = filteredLocations[activeIndex];
    if (!activeOption || activeIndex < 0) {
      return;
    }
    toggleDraftLocation(activeOption.value);
  };

  const moveActiveIndex = (direction: 1 | -1) => {
    if (filteredLocations.length === 0) {
      return;
    }

    setListFocused(true);
    setActiveIndex((current) => {
      const start = current < 0 ? (direction === 1 ? 0 : filteredLocations.length - 1) : current;
      const next = start + direction;
      if (next < 0) {
        return filteredLocations.length - 1;
      }
      if (next >= filteredLocations.length) {
        return 0;
      }
      return next;
    });
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        moveActiveIndex(event.key === 'ArrowDown' ? 1 : -1);
        break;
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        toggleActiveLocation();
        break;
      case 'Enter':
        event.preventDefault();
        toggleActiveLocation();
        break;
      case 'Escape':
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        break;
      default:
        break;
    }
  };

  const handleFooterKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setListFocused(true);
      listRef.current?.focus();
      moveActiveIndex(event.key === 'ArrowDown' ? 1 : -1);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
      setOpen(true);
      focusFilterInput();
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      focusFilterInput();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const handleFilterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && filteredLocations.length > 0) {
      event.preventDefault();
      setListFocused(true);
      setActiveIndex(0);
      listRef.current?.focus();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const applySelection = () => {
    onChange(draft);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const clearDraft = () => {
    setDraft([]);
    setActiveIndex(-1);
    setListFocused(false);
    focusFilterInput();
  };

  const handleTriggerFocus = () => {
    setOpen(true);
  };

  const handleRootBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !rootRef.current?.contains(nextTarget)) {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative w-full sm:w-[15rem] sm:shrink-0" onBlurCapture={handleRootBlur}>
      <button
        ref={triggerRef}
        type="button"
        id={`${listboxId}-trigger`}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={labels.locationLabel}
        onClick={() => {
          setOpen(true);
          focusFilterInput();
        }}
        onFocus={handleTriggerFocus}
        onKeyDown={handleTriggerKeyDown}
        className="flex h-12 w-full items-center gap-2 px-4 text-left text-base text-[#0b0c0c] outline-none focus-visible:bg-[#ffdd00] focus-visible:outline-none"
      >
        <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
        <span className={cn('min-w-0 flex-1 truncate', value.length === 0 && 'text-muted-foreground')}>
          {triggerLabel}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
      </button>

      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 flex max-h-[min(24rem,calc(100vh-8rem))] flex-col overflow-hidden rounded-none border-2 border-[#0b0c0c] bg-background shadow-lg sm:left-auto sm:w-[22rem]">
          <div className="gov-input-wrap shrink-0 border-b border-border p-3">
            <label htmlFor={`${listboxId}-filter`} className="sr-only">
              {labels.locationSearchPlaceholder}
            </label>
            <div className="gov-input flex items-center gap-2 px-3 py-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-[#ffdd00] focus-within:outline-offset-[3px]">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
              <input
                ref={filterRef}
                id={`${listboxId}-filter`}
                type="search"
                value={filter}
                onChange={(event) => {
                  setFilter(event.target.value);
                  setActiveIndex(-1);
                  setListFocused(false);
                }}
                onFocus={() => {
                  setListFocused(false);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleFilterKeyDown}
                placeholder={labels.locationSearchPlaceholder}
                className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#0b0c0c] outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            tabIndex={0}
            aria-labelledby={`${listboxId}-trigger`}
            aria-activedescendant={activeOptionId}
            aria-multiselectable="true"
            onFocus={() => {
              setListFocused(true);
              setActiveIndex((current) => (current < 0 && filteredLocations.length > 0 ? 0 : current));
            }}
            onBlur={() => setListFocused(false)}
            onKeyDown={handleListKeyDown}
            className="min-h-0 flex-1 overflow-y-auto p-2 outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#ffdd00] focus-visible:outline-offset-[-2px]"
          >
            {filteredLocations.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">—</li>
            ) : (
              filteredLocations.map((option, index) => {
                const isSelected = draft.includes(option.value);
                const isActive = listFocused && activeIndex === index;
                return (
                  <li key={option.value} role="presentation">
                    <button
                      id={`${listboxId}-option-${option.value}`}
                      type="button"
                      role="option"
                      tabIndex={-1}
                      aria-selected={isSelected}
                      onMouseEnter={() => {
                        setListFocused(true);
                        setActiveIndex(index);
                      }}
                      onClick={() => toggleDraftLocation(option.value)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-none px-3 py-2.5 text-left text-sm text-[#0b0c0c] outline-none transition-colors',
                        isSelected && 'font-semibold',
                        isActive ? 'bg-[#ffdd00]' : isSelected ? 'bg-muted' : 'bg-transparent',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-4 w-4 shrink-0 items-center justify-center border-2 border-[#0b0c0c]',
                          isSelected ? 'bg-[#0b0c0c]' : 'bg-background',
                        )}
                        aria-hidden="true"
                      >
                        {isSelected ? <Check className="h-3 w-3 text-[#ffdd00]" strokeWidth={3} /> : null}
                      </span>
                      <span className="min-w-0 flex-1">{option.label}</span>
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          <div className="shrink-0 grid grid-cols-2 border-t border-border">
            <button
              type="button"
              onClick={clearDraft}
              onKeyDown={handleFooterKeyDown}
              className="h-11 border-r border-border px-3 text-center text-sm text-muted-foreground underline decoration-1 underline-offset-4 outline-none hover:decoration-2 focus-visible:bg-[#ffdd00] focus-visible:text-[#0b0c0c] focus-visible:decoration-2 focus-visible:outline-none"
            >
              {labels.clearLocation}
            </button>
            <button
              type="button"
              onClick={applySelection}
              onKeyDown={handleFooterKeyDown}
              className={buttonVariants({ className: 'h-11 w-full rounded-none border-0 border-b-0' })}
            >
              {labels.applyLocation}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function JobSearchBar({
  query,
  locations,
  locationOptions,
  labels,
  onQueryChange,
  onLocationsChange,
  onSubmit,
}: JobSearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-5xl flex-col items-stretch gap-3 sm:flex-row sm:items-stretch sm:gap-4"
    >
      <div className="gov-input flex min-h-12 w-full flex-1 flex-col overflow-visible rounded-none border-2 border-[#0b0c0c] bg-background focus-within:outline focus-within:outline-[3px] focus-within:outline-[#ffdd00] focus-within:outline-offset-[3px] sm:h-12 sm:flex-row sm:items-stretch">
        <div className="flex min-w-0 flex-1 items-center gap-3 px-4 py-2 sm:py-0">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="job-search" className="sr-only">
            {labels.keywordLabel}
          </label>
          <input
            id="job-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={labels.keywordPlaceholder}
            className="min-w-0 flex-1 border-0 bg-transparent text-base text-[#0b0c0c] outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="hidden w-px self-stretch bg-border sm:block" aria-hidden="true" />

        <div className="border-t border-border sm:border-t-0">
          <JobLocationSelect
            value={locations}
            locationOptions={locationOptions}
            labels={labels}
            onChange={onLocationsChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className={buttonVariants({
          className:
            'min-h-12 w-full self-stretch border-2 border-b-4 px-6 py-0 text-base sm:h-12 sm:w-auto',
        })}
      >
        {labels.searchButton}
      </button>
    </form>
  );
}

export type { JobSearchBarLabels };
