import { LottieAnimation } from '@/components/home/lottie-animation';

export function HeroLottie() {
  return (
    <LottieAnimation
      src="/lottie/32230a2a-9a00-11ee-9254-1b6f9ab426cc.json"
      className="mt-10 max-w-[700px]"
      frameMax
      maxWidth={700}
      maxHeight={500}
    />
  );
}
