import { StyleTheme, ThemeVariantEnum } from '@shared/types/theme';

export const getStyleTheme = (theme: ThemeVariantEnum): StyleTheme => {
  return theme.split('-')[0] as StyleTheme;
};

export const isDarkTheme = (theme: ThemeVariantEnum): boolean => {
  return theme.endsWith('-dark');
};

export const combineTheme = (style: StyleTheme, isDark: boolean): ThemeVariantEnum => {
  return `${style}-${isDark ? 'dark' : 'light'}` as ThemeVariantEnum;
};
