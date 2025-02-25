import { getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';

import { textFont, titleFont } from '@/app/fonts';
import { Header } from '@/widgets/header';

interface RootProviderProps {
  locale: string;
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = async ({ locale, children }) => {
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning data-theme='dark'>
      <body className={`${titleFont.variable} ${textFont.variable}`}>
        <ThemeProvider disableTransitionOnChange enableSystem defaultTheme='system'>
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};
