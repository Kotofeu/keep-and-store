import en from './messages/en.json';
import { routing } from './routing';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof en;
    Locale: (typeof routing.locales)[number];
  }
}
