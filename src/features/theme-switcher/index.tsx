'use client';
import { FC, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { ClientThemeSwitcher } from './ui';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  return <ClientThemeSwitcher className={className} activeTheme={mounted ? resolvedTheme : undefined} />;
};
