export const ThemeVariant = {
  STANDARD: 'standard',
  NOTEPAD: 'notepad'
} as const;

export type ThemeVariant = (typeof ThemeVariant)[keyof typeof ThemeVariant];

export const ThemeMode = {
  LIGHT: 'light',
  DARK: 'dark'
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export interface Theme {
  variant: ThemeVariant;
  mode: ThemeMode;
}

export const DEFAULT_THEME: Theme = {
  variant: ThemeVariant.STANDARD,
  mode: ThemeMode.LIGHT
};

export const THEME_ATTRIBUTE = 'data-theme';
export const DARK_CLASS = 'dark';
