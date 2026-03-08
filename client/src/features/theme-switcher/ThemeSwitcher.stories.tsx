import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { ThemeSwitcher } from './ThemeSwitcher';

const meta = {
  title: 'Components/shared/ThemeSwitcher',
  component: ThemeSwitcher,
  parameters: { layout: 'centered' }
} satisfies Meta<typeof ThemeSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Elements exist', () => {
      expect(canvas.getByRole('combobox')).toBeInTheDocument();
      expect(canvas.getByRole('button')).toBeInTheDocument();
    });
  }
};
