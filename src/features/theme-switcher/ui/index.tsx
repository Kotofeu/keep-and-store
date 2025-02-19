import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { IconButton } from '@/shared/ui/icon-button';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

const THEME_CONFIG = [
  { key: 'light', icon: 'lightMode', className: styles.switcher__button_light },
  { key: 'dark', icon: 'darkMode', className: styles.switcher__button_dark }
] as const;

export const ClientThemeSwitcher: FC<{ className?: string; activeTheme?: string }> = ({ className, activeTheme }) => {
  const t = useTranslations('ThemeSwitcher');
  const { setTheme } = useTheme();

  const buttons = useMemo(
    () =>
      THEME_CONFIG.map(({ key, icon, className }) => (
        <IconButton
          key={key}
          className={classNames(styles.switcher__button, {}, [className])}
          onClick={() => setTheme(key)}
          title={t(key)}
          icon={icon}
          isActive={activeTheme === key}
          color='none'
        />
      )),
    [t, setTheme, activeTheme]
  );

  return <div className={classNames(styles.switcher, {}, [className])}>{buttons}</div>;
};
