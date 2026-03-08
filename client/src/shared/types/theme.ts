export type BaseTheme = 'standard' | 'notepad';

export const ThemeVariant = {
  STANDARD_LIGHT: 'standard-light',
  STANDARD_DARK: 'standard-dark',
  NOTEPAD_LIGHT: 'notepad-light',
  NOTEPAD_DARK: 'notepad-dark'
} as const;

export type ThemeVariant = (typeof ThemeVariant)[keyof typeof ThemeVariant];

export const THEME_ATTRIBUTE = 'data-theme';
