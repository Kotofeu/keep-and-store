import { type MetadataRoute } from 'next';

import { type Locale, getPathname, routing } from '@shared/i18n';

type Href = Parameters<typeof getPathname>[0]['href'];

interface IStaticRoute {
  href: Href;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastModified?: Date;
}

const getUrl = (href: Href, locale: Locale) => {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://localhost:4000';
  const pathname = getPathname({ locale, href });
  return `${baseUrl}${pathname}`;
};

const getEntry = ({ href, changeFrequency, priority, lastModified = new Date() }: IStaticRoute) => {
  const alternates = Object.fromEntries(routing.locales.map((locale) => [locale, getUrl(href, locale)]));

  return {
    url: getUrl(href, routing.defaultLocale),
    changeFrequency,
    priority,
    lastModified,
    alternates: {
      languages: alternates
    }
  };
};

const staticRoutes: IStaticRoute[] = [{ href: '/', changeFrequency: 'always', priority: 1 }];

const sitemap = (): MetadataRoute.Sitemap => {
  const entries = staticRoutes.map((route) => getEntry(route));

  return entries;
};

export default sitemap;
