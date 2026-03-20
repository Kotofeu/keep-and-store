'use client';

import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { THEME_ATTRIBUTE, ThemeVariant } from '@shared/types/theme';

export const RootProvider = ({ children, locale }: { children: ReactNode; locale: string }) => (
  <NextIntlClientProvider locale={locale}>
    <ThemeProvider
      attribute={THEME_ATTRIBUTE}
      defaultTheme={ThemeVariant.STANDARD_LIGHT}
      themes={Object.values(ThemeVariant)}
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  </NextIntlClientProvider>
);
