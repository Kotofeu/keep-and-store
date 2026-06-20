import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { Locale, MessageTree } from '@shared/i18n/routing';
import { THEME_ATTRIBUTE, ThemeVariantEnum } from '@shared/types/theme';

export const RootProvider = ({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: Locale;
  messages: MessageTree;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider
        attribute={THEME_ATTRIBUTE}
        defaultTheme={ThemeVariantEnum.STANDARD_LIGHT}
        themes={Object.values(ThemeVariantEnum)}
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};
