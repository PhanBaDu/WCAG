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
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <span aria-hidden="true" className="text-muted-foreground/80">{'>'}</span> : null}
              {item.href && !isLast ? (
                <TextNavigationLink href={item.href} className="text-sm font-medium">
                  {item.label}
                </TextNavigationLink>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className="font-medium">
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
