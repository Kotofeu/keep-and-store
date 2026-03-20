'use client';

import { useCallback, useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { ThemeVariant, BaseTheme } from '@shared/types/theme';
import { combineTheme, getBaseTheme, isDarkTheme } from '@shared/utils/theme-parser';

export const useAppTheme = () => {
  const { theme, setTheme } = useNextTheme();

  const currentTheme = (theme || ThemeVariant.STANDARD_LIGHT) as ThemeVariant;

  const baseTheme = useMemo(() => getBaseTheme(currentTheme), [currentTheme]);
  const isDark = useMemo(() => isDarkTheme(currentTheme), [currentTheme]);

  const setBaseTheme = useCallback(
    (newBase: BaseTheme) => {
      setTheme(combineTheme(newBase, isDark));
    },
    [isDark, setTheme]
  );

  const toggleDark = useCallback(() => {
    setTheme(combineTheme(baseTheme, !isDark));
  }, [baseTheme, isDark, setTheme]);

  return {
    theme: currentTheme,
    setTheme,
    baseTheme,
    isDark,
    setBaseTheme,
    toggleDark
  };
};
