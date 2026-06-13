 "use client";

import { useLocale } from 'next-intl';

export function Footer() {
  const locale = useLocale();
  const copy =
    locale === 'en'
      ? '© 2024 AccessJobs • VN. Accessible job portal for persons with disabilities.'
      : '© 2024 AccessJobs • VN. Cổng việc làm tiếp cận cho người khuyết tật.';

  return (
    <footer className="border-t py-12 bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>{copy}</p>
      </div>
    </footer>
  );
}
