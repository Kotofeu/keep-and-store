import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AlternateURLs } from 'next/dist/lib/metadata/types/alternative-urls-types';

import { Locale } from '@/shared/i18n';

export const getDefaultMetadata = async (
  path: string = '/',
  locale: Locale = 'en',
  allLocales: string[] = []
): Promise<Metadata> => {
  const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://localhost:4000';
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const alternateURLs: AlternateURLs = {
    canonical: `/${locale}`,
    languages: {
      ...allLocales.reduce((acc: { [key: string]: string }, lang) => {
        acc[lang] = `/${lang}${path}`;
        return acc;
      }, {}),
      'x-default': '/'
    }
  };
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: {
      name: t('authorName'),
      url: t('authorUrl')
    },
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: baseUrl,
      siteName: t('siteName'),
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/preview-image.jpg',
          alt: t('description')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/preview-image.jpg',
          alt: t('description')
        }
      ]
    },
    robots: 'index, follow',
    alternates: alternateURLs
  };
};
