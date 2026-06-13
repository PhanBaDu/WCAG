"use client";

import Lottie from 'lottie-react';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type LottieFrame = {
  w?: number;
  h?: number;
  fr?: number;
};

type LottieAnimationProps = {
  src: string;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
  frameMax?: boolean;
};

function getDisplaySize(
  data: LottieFrame,
  maxWidth?: number,
  maxHeight?: number,
  frameMax?: boolean
) {
  const frameWidth = data.w ?? 320;
  const frameHeight = data.h ?? 320;

  if (frameMax && maxWidth === undefined && maxHeight === undefined) {
    return { width: frameWidth, height: frameHeight };
  }

  const capWidth = maxWidth ?? frameWidth;
  const capHeight = maxHeight ?? frameHeight;
  const scale = Math.min(capWidth / frameWidth, capHeight / frameHeight, 1);

  return {
    width: Math.round(frameWidth * scale),
    height: Math.round(frameHeight * scale),
  };
}

export function LottieAnimation({
  src,
  className,
  maxWidth,
  maxHeight,
  frameMax = false,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<LottieFrame | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(media.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setReduceMotion(event.matches);
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    fetch(src)
      .then((response) => response.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, [src]);

  const displaySize = useMemo(() => {
    if (!animationData) return null;
    return getDisplaySize(animationData, maxWidth, maxHeight, frameMax);
  }, [animationData, maxWidth, maxHeight, frameMax]);

  if (!animationData || !displaySize) {
    return null;
  }

  return (
    <div className={cn('mx-auto flex w-full justify-center', className)} aria-hidden="true">
      <Lottie
        animationData={animationData}
        loop
        autoplay={!reduceMotion}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: false,
        }}
        style={{
          width: displaySize.width,
          height: displaySize.height,
          maxWidth: '100%',
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}
