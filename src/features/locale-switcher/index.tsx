import { useLocale, useTranslations } from 'next-intl';
import { FC } from 'react';

import { Locale, routing } from '@/shared/i18n';
import { Icon } from '@/shared/ui/icon';

import { ClientSelect } from './ui/client-switcher';

export const LocaleSwitcher: FC = () => {
  const locale = useLocale();
  const t = useTranslations('LocalSwitcher');
  return (
    <ClientSelect
      value={{
        value: locale,
        label: t(locale as Locale),
        ui: (
          <span style={{ display: 'flex', gap: 5, margin: '5px 0' }}>
            <Icon style={{ width: '1em' }} type={locale as Locale} /> {t(locale as Locale)}
          </span>
        )
      }}
      options={routing.locales.map(cur => ({
        value: cur,
        label: t(cur),
        ui: (
          <span style={{ display: 'flex', gap: 5, margin: '5px 0' }}>
            <Icon style={{ width: '1em' }} type={cur} /> {t(cur)}
          </span>
        )
      }))}
    />
  );
};
