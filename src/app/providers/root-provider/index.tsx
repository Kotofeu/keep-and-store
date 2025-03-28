import { NextIntlClientProvider } from 'next-intl';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';

import { textFont, titleFont } from '@/app/fonts';
import { Header } from '@/widgets/header';
import { Locale } from '@/shared/i18n';

interface RootProviderProps {
  locale: Locale;
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = async ({ locale, children }) => {
  const messages = await getMessages();
  return (
    <html className={`${titleFont.variable} ${textFont.variable}`} lang={locale} suppressHydrationWarning>
      <body>
        <ThemeProvider enableColorScheme={false} defaultTheme='system' enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
