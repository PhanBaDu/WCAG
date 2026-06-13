import { NotFoundView } from '@/components/not-found/not-found-view';
import { SetChromeMode } from '@/components/layout/chrome-mode';

export default function NotFoundPage() {
  return (
    <>
      <SetChromeMode mode="minimal" />
      <NotFoundView />
    </>
  );
}
