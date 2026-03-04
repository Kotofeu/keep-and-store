import type { Preview } from '@storybook/nextjs-vite';
import { ThemeDecorator } from './ThemeDecorator';
import '../src/app/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    a11y: {
      test: 'todo'
    }
  },
  globalTypes: {
    theme: {
      name: 'Тема',
      description: 'Базовая тема оформления',
      defaultValue: 'standard',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'standard', title: 'Standard' },
          { value: 'notepad', title: 'Notepad' }
        ]
      }
    },
    colorScheme: {
      name: 'Цветовая схема',
      description: 'Светлая или тёмная',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' }
        ]
      }
    }
  },
  tags: ['autodocs'],
  decorators: [ThemeDecorator]
};
export default preview;
