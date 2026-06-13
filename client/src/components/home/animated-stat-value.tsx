"use client";

import { useEffect, useRef, useState } from 'react';

function easeOutExpo(progress: number) {
  return progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
}

type AnimatedStatValueProps = {
  value: string;
  countTo?: number;
  suffix?: string;
};

export function AnimatedStatValue({ value, countTo, suffix = '' }: AnimatedStatValueProps) {
  const [display, setDisplay] = useState(countTo ? 1 : null);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!countTo) return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) {
      setDisplay(countTo);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2200;
        const start = 1;
        const startTime = performance.now();

        const tick = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = easeOutExpo(progress);
          const current = Math.round(start + (countTo - start) * eased);
          setDisplay(current);

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [countTo]);

  if (!countTo) {
    return <div className="text-4xl font-bold tracking-tight">{value}</div>;
  }

  const formatted = display?.toLocaleString('en-US') ?? value;

  return (
    <div ref={ref} className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl" aria-label={value}>
      <span aria-hidden="true">
        {formatted}
        {suffix}
      </span>
      <span className="sr-only">{value}</span>
    </div>
  );
}
