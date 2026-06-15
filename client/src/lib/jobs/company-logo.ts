export function slugifyCompanyName(company: string) {
  return company
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

export function getCompanyLogoSrc(company: string) {
  const pool = [
    '/company-logos/rmg.png',
    '/company-logos/tessellation.png',
    '/company-logos/tti.png',
    '/company-logos/phan-bach.png',
    '/company-logos/pma.png',
    '/company-logos/ocb.png',
    '/company-logos/cp-group.png',
    '/company-logos/cx-tech.png',
    '/company-logos/vietnamcontrol.png',
    '/company-logos/juki.png',
    '/company-logos/generic-building-1.png',
    '/company-logos/ito.png',
    '/company-logos/kd9.png',
    '/company-logos/generic-building-2.png',
    '/company-logos/ktp.png',
    '/company-logos/d-nap.png',
  ] as const;

  let hash = 0;
  for (let i = 0; i < company.length; i++) {
    hash = (hash * 31 + company.charCodeAt(i)) >>> 0;
  }

  return pool[hash % pool.length];
}

export function getCompanyLogoAlt(company: string) {
  return `Logo công ty ${company}`;
}

