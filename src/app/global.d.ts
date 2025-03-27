/* eslint-disable no-unused-vars */
import { routing } from '@/shared/i18n';
import en from '~/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
    Locale: (typeof routing.locales)[number];
  }
}
