import { Decorator } from '@storybook/nextjs-vite';
import { useEffect } from 'react';
import { THEME_ATTRIBUTE } from '@shared/types/theme';

export const ThemeDecorator: Decorator = (Story, context) => {
  const baseTheme = context.globals.theme || 'standard';
  const colorScheme = context.globals.colorScheme || 'light';

  useEffect(() => {
    const fullTheme = `${baseTheme}-${colorScheme}`;
    document.documentElement.setAttribute(THEME_ATTRIBUTE, fullTheme);
  }, [baseTheme, colorScheme]);

  return <Story />;
};
