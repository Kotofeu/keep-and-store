import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button with two style variants (primary/secondary). Supports all standard HTMLButtonElement attributes.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Style variant of the button',
      table: {
        defaultValue: { summary: 'primary' }
      }
    },
    children: {
      control: 'text',
      description: 'Content of the button (text or React elements)'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button'
    },
    onClick: {
      action: 'clicked'
    }
  },
  args: {
    onClick: fn(),
    children: 'Button'
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Button/i });

    await step('Check initial state', () => {
      expect(button).toBeEnabled();
      expect(button).toHaveClass('bg-button-primary-bg');
    });

    await step('Click the button', async () => {
      await userEvent.click(button);
      expect(button).toBeVisible();
    });
  }
};

export const Secondary: Story = {
  args: {
    variant: 'secondary'
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button with border.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Button/i });
    expect(button).toHaveClass('border-button-secondary-border');
  }
};

export const LongText: Story = {
  args: {
    children: 'Very long button text that should wrap correctly'
  }
};

export const Disabled: Story = {
  args: {
    disabled: true
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Button/i });
    expect(button).toBeDisabled();
  }
};

export const AccessibilityIssue: Story = {
  args: {
    variant: 'primary',
    children: 'Poor contrast'
  },
  parameters: {
    a11y: {}
  }
};

export const Playground: Story = {
  args: {
    variant: 'primary',
    children: 'Play with me',
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Story where you can change props in real-time via Controls and see actions in the Actions panel.'
      }
    }
  }
};
