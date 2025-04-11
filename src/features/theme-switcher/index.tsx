'use client';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

import { Tooltip } from '@/shared/ui/tooltip';
import { IconButton } from '@/shared/ui/icon-button';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

const THEME_CONFIG = [
  { key: 'light', icon: 'lightMode', className: styles.switcher__button_light },
  { key: 'dark', icon: 'darkMode', className: styles.switcher__button_dark }
] as const;

interface ThemeSwitcherProps {
  className?: string;
}

export function ThemeSwitcher({ className }: ThemeSwitcherProps) {
  const t = useTranslations('ThemeSwitcher');
  const { setTheme } = useTheme();

  return (
    <div className={classNames(styles.switcher, {}, [className])}>
      {THEME_CONFIG.map(({ key, icon, className: btnClass }) => (
        <Tooltip key={key} content={t(key)}>
          <IconButton
            className={classNames(styles.switcher__button, {}, [btnClass])}
            onClick={() => setTheme(key)}
            icon={icon}
            color='none'
            aria-label={t(key)}
          />
        </Tooltip>
      ))}
    </div>
  );
}
