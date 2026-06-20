'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useAppTheme } from '@shared/hooks/useAppTheme';
import { useIsMounted } from '@shared/hooks/useIsMounted';
import { Button } from '@shared/ui/button';
import { Icon } from '@shared/ui/icon';
import { cn } from '@shared/utils/cn';

interface ThemeModeSwitcherProps {
  className?: string;
}

export const ThemeModeSwitcher: FC<ThemeModeSwitcherProps> = ({ className }) => {
  const t = useTranslations('theme');
  const isMounted = useIsMounted();
  const { isDark, toggleDark } = useAppTheme();

  if (!isMounted) {
    return <span className="bg-bg h-8.5 w-8.5 rounded-full border border-transparent" aria-hidden />;
  }

  return (
    <Button
      className={cn(
        'bg-bg hover:border-input-border-hover h-8.5 w-8.5 cursor-pointer rounded-full border border-transparent p-1 transition-colors',
        className
      )}
      onClick={toggleDark}
      variant={'clear'}
      title={t(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Icon type="lightMode" /> : <Icon type="darkMode" />}
    </Button>
  );
};
