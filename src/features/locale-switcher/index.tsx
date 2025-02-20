import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

import { Locale, routing } from '@/shared/i18n';

import { ClientSelect } from './ui/client-switcher';
import { LocaleItem } from './ui/locale-item';

export const LocaleSwitcher: FC = () => {
  const locale = useLocale();
  const t = useTranslations('LocalSwitcher');
  return (
    <ClientSelect
      value={{
        value: locale,
        label: t(locale as Locale),
        ui: <LocaleItem locale={locale as Locale} />
      }}
      options={routing.locales.map(cur => ({
        value: cur,
        label: t(cur),
        ui: <LocaleItem locale={cur} key={cur} />
      }))}
    />
  );
};
