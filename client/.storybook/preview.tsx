import { useEffect } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { ThemeProvider } from 'next-themes';
import { useAppTheme } from '@shared/hooks/useAppTheme';
import { THEME_ATTRIBUTE, ThemeVariant } from '@shared/types/theme';
import '../src/app/styles/index.css';

const themeItems = [
  { value: ThemeVariant.STANDARD_LIGHT, title: 'Standard - Light' },
  { value: ThemeVariant.STANDARD_DARK, title: 'Standard - Dark' },
  { value: ThemeVariant.NOTEPAD_LIGHT, title: 'Notepad - Light' },
  { value: ThemeVariant.NOTEPAD_DARK, title: 'Notepad - Dark' }
];

const ThemeSync = ({ selectedTheme }: { selectedTheme: ThemeVariant }) => {
  const { theme, setTheme } = useAppTheme();
  useEffect(() => {
    if (selectedTheme && theme !== selectedTheme) {
      setTheme(selectedTheme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTheme]);
  return null;
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    nextjs: { appDirectory: true },
    docs: { toc: true },
    a11y: { test: 'todo' },
    backgrounds: {
      disable: true
    }
  },
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Theme switcher',
      defaultValue: ThemeVariant.STANDARD_LIGHT,
      toolbar: {
        items: themeItems,
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = (context.globals.theme as ThemeVariant) || ThemeVariant.STANDARD_LIGHT;

      return (
        <ThemeProvider
          attribute={THEME_ATTRIBUTE}
          defaultTheme={ThemeVariant.STANDARD_LIGHT}
          themes={Object.values(ThemeVariant)}
          enableSystem={false}
          disableTransitionOnChange
        >
          <ThemeSync selectedTheme={selectedTheme} />
          <Story />
        </ThemeProvider>
      );
    }
  ]
};

export default preview;
