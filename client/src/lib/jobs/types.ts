export type SearchScope = 'title' | 'company' | 'both';

export type MockJobListing = {
  slug: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  experience: string;
  category: string;
  industry: string;
  disabilityTypes: string[];
  salaryRange: string;
  isPriority: boolean;
  isHot: boolean;
};

export type JobFacet = {
  value: string;
  label: string;
  count: number;
};
