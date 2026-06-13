"use client";

import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

const LOTTIE_SRC = '/lottie/32230a2a-9a00-11ee-9254-1b6f9ab426cc.json';

export function HeroLottie() {
  const [animationData, setAnimationData] = useState<object | null>(null);
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
    fetch(LOTTIE_SRC)
      .then((response) => response.json())
      .then(setAnimationData)
      .catch(() => setAnimationData(null));
  }, []);

  if (!animationData) {
    return null;
  }

  return (
    <div
      className="mx-auto mt-10 w-full max-w-[700px]"
      aria-hidden="true"
    >
      <Lottie
        animationData={animationData}
        loop={!reduceMotion}
        autoplay={!reduceMotion}
        className="h-auto w-full"
        style={{ maxWidth: 700, maxHeight: 500 }}
      />
    </div>
  );
}
