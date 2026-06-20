'use client';

import { useCallback, useMemo } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { ThemeVariantEnum, StyleTheme } from '@shared/types/theme';
import { combineTheme, getStyleTheme, isDarkTheme } from '@shared/utils/theme-parser';

export const useAppTheme = () => {
  const { theme, setTheme } = useNextTheme();

  const currentTheme = (theme || ThemeVariantEnum.STANDARD_LIGHT) as ThemeVariantEnum;

  const styleTheme = useMemo(() => getStyleTheme(currentTheme), [currentTheme]);
  const isDark = useMemo(() => isDarkTheme(currentTheme), [currentTheme]);

  const setStyleTheme = useCallback(
    (newStyle: StyleTheme) => {
      setTheme(combineTheme(newStyle, isDark));
    },
    [isDark, setTheme]
  );

  const toggleDark = useCallback(() => {
    setTheme(combineTheme(styleTheme, !isDark));
  }, [styleTheme, isDark, setTheme]);

  return {
    theme: currentTheme,
    setTheme,
    styleTheme,
    isDark,
    setStyleTheme,
    toggleDark
  };
};
