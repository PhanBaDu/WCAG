import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'cv-demo.pdf');
  const file = readFileSync(filePath);

  return new Response(file, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="cv-demo.pdf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
