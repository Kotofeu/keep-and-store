import { DARK_CLASS, THEME_ATTRIBUTE, Theme, ThemeMode, ThemeVariant } from '@shared/types/theme';

export const applyThemeToDom = (theme: Theme): void => {
  if (typeof document === 'undefined') {
    return;
  }

  const root = document.documentElement;
  root.setAttribute(THEME_ATTRIBUTE, theme.variant);
  root.classList.toggle(DARK_CLASS, theme.mode === ThemeMode.DARK);
};

export const getThemeFromDom = (): Theme => {
  if (typeof document === 'undefined') {
    return { variant: ThemeVariant.STANDARD, mode: ThemeMode.LIGHT };
  }

  const root = document.documentElement;
  const variant = (root.getAttribute(THEME_ATTRIBUTE) as ThemeVariant) || ThemeVariant.STANDARD;
  const mode = root.classList.contains(DARK_CLASS) ? ThemeMode.DARK : ThemeMode.LIGHT;
  return { variant, mode };
};
