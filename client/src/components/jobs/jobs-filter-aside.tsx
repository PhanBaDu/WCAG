type JobsFilterAsideProps = {
  label: string;
  children: React.ReactNode;
};

export function JobsFilterAside({ label, children }: JobsFilterAsideProps) {
  return (
    <aside id="jobs-filters" aria-label={label} tabIndex={-1}>
      {children}
    </aside>
  );
}
