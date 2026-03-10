import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, within } from 'storybook/test';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Component that allows switching between base themes (standard/notepad) and toggling dark/light mode. Uses the global theme from the toolbar.'
      }
    }
  },
  argTypes: {},
  args: {}
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('Component renders', async () => {
      const select = await canvas.findByRole('combobox');
      const button = await canvas.findByRole('button');
      expect(select).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });

    await step('Initial button text is for light mode', async () => {
      const button = canvas.getByRole('button');
      expect(button).toHaveTextContent('🌙 Тёмная');
    });

    await step('Click toggles to dark mode', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);
      expect(button).toHaveTextContent('☀️ Светлая');
    });

    await step('Click again toggles back to light mode', async () => {
      const button = canvas.getByRole('button');
      await userEvent.click(button);
      expect(button).toHaveTextContent('🌙 Тёмная');
    });

    await step('Select notepad theme', async () => {
      const select = canvas.getByRole('combobox');
      await userEvent.selectOptions(select, 'notepad');
      expect(select).toHaveValue('notepad');
    });

    await step('Select standard theme', async () => {
      const select = canvas.getByRole('combobox');
      await userEvent.selectOptions(select, 'standard');
      expect(select).toHaveValue('standard');
    });
  }
};
