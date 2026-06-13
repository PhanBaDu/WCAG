import { TextNavigationLink } from '@/components/ui/text-navigation-link';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageBreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function PageBreadcrumb({ items }: PageBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className="text-muted-foreground/80">{'>'}</span> : null}
              {item.href && !isLast ? (
                <TextNavigationLink href={item.href}>
                  {item.label}
                </TextNavigationLink>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'font-medium text-foreground' : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
