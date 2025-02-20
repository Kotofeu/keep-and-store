import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { Icon } from '@/shared/ui/icon';
import { Locale } from '@/shared/i18n';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

interface LocaleItemProps {
  className?: string;
  locale: Locale;
}

export const LocaleItem: FC<LocaleItemProps> = ({ className, locale }) => {
  const t = useTranslations('LocalSwitcher');
  return (
    <div className={classNames(styles.locale, {}, [className])}>
      <Icon className={styles.locale__icon} type={locale} />
      <span className={styles.locale__label}>{t(locale)}</span>
    </div>
  );
};
