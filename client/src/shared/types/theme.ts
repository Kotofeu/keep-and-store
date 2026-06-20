export type StyleTheme = 'standard' | 'notepad';

export const ThemeVariantEnum = {
  STANDARD_LIGHT: 'standard-light',
  STANDARD_DARK: 'standard-dark',
  NOTEPAD_LIGHT: 'notepad-light',
  NOTEPAD_DARK: 'notepad-dark'
} as const;

export type ThemeVariantEnum = (typeof ThemeVariantEnum)[keyof typeof ThemeVariantEnum];

export const StyleThemeEnum = {
  STANDARD: 'standard',
  NOTEPAD: 'notepad'
} as const;

export type StyleThemeEnum = (typeof StyleThemeEnum)[keyof typeof StyleThemeEnum];

export const THEME_ATTRIBUTE = 'data-theme';
