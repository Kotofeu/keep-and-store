import { THEME_COOKIE_NAME } from '@shared/lib/themeCookie';
import { ThemeVariant, ThemeMode } from '@shared/types/theme';

export const ThemeScript = () => {
  const scriptCode = `
    (function() {
      try {
        const root = document.documentElement;
        const getCookie = (name) => {
          const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
          return match ? decodeURIComponent(match[2]) : null;
        };
        let themeString = getCookie('${THEME_COOKIE_NAME}');
        if (!themeString) {
          try { themeString = localStorage.getItem('theme'); } catch {}
        }

        let variant = '${ThemeVariant.STANDARD}';
        let mode = '${ThemeMode.LIGHT}';

        if (themeString) {
          const parts = themeString.split(':');
          if (parts[0]) variant = parts[0];
          if (parts[1] === '${ThemeMode.DARK}' || parts[1] === '${ThemeMode.LIGHT}') mode = parts[1];
        } else {
          try {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            mode = prefersDark ? '${ThemeMode.DARK}' : '${ThemeMode.LIGHT}';
          } catch {}
        }

        root.setAttribute('data-theme', variant);
        root.classList.toggle('dark', mode === '${ThemeMode.DARK}');
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: scriptCode }} />;
};
