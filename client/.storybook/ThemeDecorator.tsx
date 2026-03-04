import { Decorator } from '@storybook/nextjs-vite';
import { useEffect } from 'react';

export const ThemeDecorator: Decorator = (Story, context) => {
  const theme = context.globals.theme || 'standard';
  const colorScheme = context.globals.colorScheme || 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (colorScheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme, colorScheme]);

  return <Story />;
};
