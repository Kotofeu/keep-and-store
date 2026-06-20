import { useEffect } from 'react';
import type { Preview } from '@storybook/nextjs-vite';
import { RootProvider } from '@app/providers/root-provider';
import { useAppTheme } from '@shared/hooks/useAppTheme';
import enMessages from '@shared/i18n/messages/en.json';
import ruMessages from '@shared/i18n/messages/ru.json';
import { DEFAULT_LOCALE, LOCALES, LOCALE_NAMES, MessageTree, type Locale } from '@shared/i18n/routing';
import { ThemeVariantEnum } from '@shared/types/theme';
import '../src/app/styles/index.css';

const messagesMap: Record<Locale, MessageTree> = {
  en: enMessages,
  ru: ruMessages
};

const themeItems = [
  { value: ThemeVariantEnum.STANDARD_LIGHT, title: 'Standard - Light' },
  { value: ThemeVariantEnum.STANDARD_DARK, title: 'Standard - Dark' },
  { value: ThemeVariantEnum.NOTEPAD_LIGHT, title: 'Notepad - Light' },
  { value: ThemeVariantEnum.NOTEPAD_DARK, title: 'Notepad - Dark' }
];

const ThemeSync = ({ selectedTheme }: { selectedTheme: ThemeVariantEnum }) => {
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
      defaultValue: ThemeVariantEnum.STANDARD_LIGHT,
      toolbar: {
        items: themeItems,
        dynamicTitle: true
      }
    },
    locale: {
      name: 'Locale',
      description: 'Language switcher',
      defaultValue: DEFAULT_LOCALE,
      toolbar: {
        icon: 'globe',
        items: LOCALES.map((locale) => ({
          value: locale,
          title: LOCALE_NAMES[locale]
        })),
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (Story, context) => {
      const selectedTheme = (context.globals.theme as ThemeVariantEnum) || ThemeVariantEnum.STANDARD_LIGHT;
      const selectedLocale = (context.globals.locale as Locale) || DEFAULT_LOCALE;
      const currentMessages = messagesMap[selectedLocale];

      return (
        <RootProvider locale={selectedLocale} messages={currentMessages}>
          <ThemeSync selectedTheme={selectedTheme} />
          <Story />
        </RootProvider>
      );
    }
  ]
};

export default preview;
