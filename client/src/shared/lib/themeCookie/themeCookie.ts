import { Theme, DEFAULT_THEME, ThemeMode, ThemeVariant } from '@shared/types/theme';

export const THEME_COOKIE_NAME = 'theme';

export const parseThemeCookie = (cookieValue?: string | null): Theme => {
  if (!cookieValue) {
    return DEFAULT_THEME;
  }

  try {
    const decoded = decodeURIComponent(cookieValue);
    const [variant, mode] = decoded.split(':') as [ThemeVariant, ThemeMode];

    if (Object.values(ThemeVariant).includes(variant) && Object.values(ThemeMode).includes(mode)) {
      return { variant, mode };
    }
  } catch {
    // ignore
  }
  return DEFAULT_THEME;
};

export const serializeThemeCookie = (theme: Theme): string => {
  const value = encodeURIComponent(`${theme.variant}:${theme.mode}`);
  return `${THEME_COOKIE_NAME}=${value}; Path=/; Max-Age=31536000; SameSite=Lax`;
};
