'use client';

import { useEffect, useState, useCallback, ReactNode } from 'react';
import { ThemeContext } from '@shared/hooks/useTheme';
import { serializeThemeCookie } from '@shared/lib/themeCookie';
import { applyThemeToDom, getThemeFromDom } from '@shared/lib/themeDom';
import { Theme, ThemeMode, ThemeVariant } from '@shared/types/theme';

export const ThemeProvider = ({ children, initialTheme }: { children: ReactNode; initialTheme: Theme }) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const domTheme = getThemeFromDom();
    setThemeState(domTheme);
    setIsMounted(true);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDom(newTheme);
    document.cookie = serializeThemeCookie(newTheme);
    try {
      localStorage.setItem('theme', `${newTheme.variant}:${newTheme.mode}`);
    } catch {}
  }, []);

  const setVariant = useCallback(
    (variant: ThemeVariant) => {
      setTheme({ ...theme, variant });
    },
    [theme, setTheme]
  );

  const toggleMode = useCallback(() => {
    const newMode = theme.mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    setTheme({ ...theme, mode: newMode });
  }, [theme, setTheme]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && e.newValue) {
        const [variant, mode] = e.newValue.split(':') as [ThemeVariant, ThemeMode];
        if (variant && mode) {
          const newTheme = { variant, mode };
          setThemeState(newTheme);
          applyThemeToDom(newTheme);
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ThemeContext.Provider value={{ theme, setTheme, setVariant, toggleMode }}>{children}</ThemeContext.Provider>;
};
