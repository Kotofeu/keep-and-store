import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const LOCALES = ['en', 'ru'] as const;
export type Locale = (typeof routing.locales)[number];

export const DEFAULT_LOCALE = 'en' as const;

export const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  ru: 'Русский'
} as const;

export interface MessageTree {
  [key: string]: string | MessageTree;
}

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
  localeDetection: false,
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/'
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
