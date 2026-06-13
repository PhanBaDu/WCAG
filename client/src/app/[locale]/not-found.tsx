import { NotFoundView } from '@/components/not-found/not-found-view';
import { SetChromeMode } from '@/components/layout/chrome-mode';

export default function NotFoundPage() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `[data-app-shell="true"] > header,[data-app-shell="true"] > footer{display:none!important}`,
        }}
      />
      <SetChromeMode mode="minimal" />
      <NotFoundView />
    </>
  );
}
