import { NextIntlClientProvider } from 'next-intl';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { textFont, titleFont } from '@/app/fonts';
import { Header } from '@/widgets/header';
import { Locale } from '@/shared/i18n';

interface RootProviderProps {
  locale: Locale;
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = async ({ locale, children }) => (
  <html className={`${titleFont.variable} ${textFont.variable}`} lang={locale} suppressHydrationWarning>
    <body>
      <ThemeProvider enableColorScheme={false} defaultTheme='system' enableSystem disableTransitionOnChange>
        <NextIntlClientProvider>
          <Header />
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </body>
  </html>
);
