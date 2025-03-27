import { ReactNode } from 'react';

import { Locale } from '@/shared/i18n';

export interface BasePageProps {
  params: Promise<{ locale: Locale }>;
}

export interface BaseLayoutProps {
  params: Promise<{ locale: Locale }>;
  children: ReactNode;
}
