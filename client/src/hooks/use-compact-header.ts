import { useLayoutEffect, useRef, useState } from 'react';

export function useCompactHeader(deps: unknown[] = []) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(true);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const update = () => {
      const available = container.clientWidth;
      const required = measure.scrollWidth;
      setCompact(mediaQuery.matches || required > available);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(container);
    observer.observe(measure);
    mediaQuery.addEventListener('change', update);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { containerRef, measureRef, compact };
}
