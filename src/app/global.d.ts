import { routing } from '@shared/i18n';
import en from '@shared/i18n/messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
    Locale: (typeof routing.locales)[number];
  }
}