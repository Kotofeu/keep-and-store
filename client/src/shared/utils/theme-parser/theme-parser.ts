import { BaseTheme, ThemeVariant } from '@shared/types/theme';

export const getBaseTheme = (theme: ThemeVariant): BaseTheme => {
  return theme.split('-')[0] as BaseTheme;
};

export const isDarkTheme = (theme: ThemeVariant): boolean => {
  return theme.endsWith('-dark');
};

export const combineTheme = (base: BaseTheme, isDark: boolean): ThemeVariant => {
  return `${base}-${isDark ? 'dark' : 'light'}` as ThemeVariant;
};
