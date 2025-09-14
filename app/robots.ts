import { type MetadataRoute } from 'next';

import { type Pathnames } from '@shared/i18n';

const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://localhost:4000';

const disallow: Pathnames[] = ['/test/colors', '/test/icons'];

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow
    }
  ],
  sitemap: `${baseUrl}/sitemap.xml`
});

export default robots;
