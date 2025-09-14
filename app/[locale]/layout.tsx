import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { type FC } from 'react';

import { textFont, titleFont } from '@app/fonts';

import { routing } from '@shared/i18n';

import '@app/styles/index.scss';

export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

const LocaleLayout: FC<LayoutProps<'/[locale]'>> = async ({ children, params }) => {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${titleFont.variable} ${textFont.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <main>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
