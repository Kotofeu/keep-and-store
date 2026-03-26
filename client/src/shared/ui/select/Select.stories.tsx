import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Select } from './Select';
import type { Option } from './types';

const sampleOptions: Option[] = [
  { value: 'apple', label: 'Apple', icon: '🍎' },
  { value: 'banana', label: 'Banana', icon: '🍌' },
  { value: 'orange', label: 'Orange', icon: '🍊' },
  { value: 'grape', label: 'Grape', icon: '🍇', disabled: true }
];

const loadFruitsAsync = async (): Promise<Option[]> => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  return sampleOptions;
};

const meta = {
  title: 'shared/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Advanced Select component with single/multiple modes, built-in search, clearable, async loading (loadOptions), chips and full keyboard support.'
      }
    }
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Multiple selection mode',
      table: { defaultValue: { summary: 'false' } }
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button (×)',
      table: { defaultValue: { summary: 'true' } }
    },
    disabled: { control: 'boolean' },
    error: { control: 'text', description: 'Error message (triggers error styling)' },
    placeholder: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    options: { control: 'object' },
    loadOptions: { control: false },
    value: { control: false },
    onChange: { action: 'onChange' }
  },
  args: {
    onChange: fn(),
    options: sampleOptions,
    placeholder: 'Select an option...',
    searchPlaceholder: 'Search...'
  }
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Select an option...');

    await step('Open dropdown', async () => {
      await userEvent.click(trigger);
    });

    await step('Select "Apple"', async () => {
      const apple = await canvas.findByText('Apple');
      await userEvent.click(apple);
      expect(canvas.getByText('Apple')).toBeInTheDocument();
      expect(canvas.getByText('🍎')).toBeInTheDocument();
    });
  }
};

export const Multiple: Story = {
  args: { multiple: true },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Select an option...');

    await step('Open and select two items', async () => {
      await userEvent.click(trigger);
      await userEvent.click(canvas.getByText('Apple'));
      await userEvent.click(canvas.getByText('Banana'));
    });

    await step('Remove Apple chip', async () => {
      const removeBtn = canvas.getByLabelText(/Remove Apple/i);
      await userEvent.click(removeBtn);
      expect(canvas.queryByRole('button', { name: /Remove Apple/i })).not.toBeInTheDocument();
      expect(canvas.getByRole('button', { name: /Remove Banana/i })).toBeInTheDocument();
    });
  }
};

export const ClearableFalse: Story = {
  args: { clearable: false },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Apple');
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByText('Orange'));
    expect(canvas.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  }
};

export const WithError: Story = {
  args: {
    error: 'Something went wrong',
    options: []
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('combobox');
    expect(trigger).toHaveClass('border-input-border-error');
  }
};

export const AsyncLoading: Story = {
  args: {
    loadOptions: loadFruitsAsync,
    placeholder: 'Load fruits...'
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Load fruits...');

    await step('Open → wait loading → select', async () => {
      await userEvent.click(trigger);
      const apple = await canvas.findByText('Apple');
      await userEvent.click(apple);
      expect(canvas.getByText('Apple')).toBeInTheDocument();
    });
  }
};

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Select an option...');

    await userEvent.click(trigger);
    expect(canvas.queryByText('Apple')).not.toBeInTheDocument();
  }
};

export const SearchFiltering: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Select an option...');
    await userEvent.click(trigger);

    const searchInput = canvas.getByPlaceholderText('Search...');
    await userEvent.type(searchInput, 'ban');

    expect(canvas.getByText('Banana')).toBeInTheDocument();
    expect(canvas.queryByText('Apple')).not.toBeInTheDocument();
  }
};

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const [value, setValue] = useState<Option | null>(null);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <Select
          {...args}
          value={value}
          onChange={(newValue) => {
            setValue(newValue as Option | null);
            args.onChange?.(newValue);
          }}
        />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setValue(sampleOptions[0])}>Set Apple</button>
          <button onClick={() => setValue(sampleOptions[1])}>Set Banana</button>
          <button onClick={() => setValue(null)}>Clear</button>
        </div>
      </div>
    );
  },
  args: {
    placeholder: 'Controlled select'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const setAppleBtn = canvas.getByText('Set Apple');
    await userEvent.click(setAppleBtn);
    expect(canvas.getByText('Apple')).toBeInTheDocument();
    const setBananaBtn = canvas.getByText('Set Banana');
    await userEvent.click(setBananaBtn);
    expect(canvas.getByText('Banana')).toBeInTheDocument();
    const clearBtn = canvas.getByText('Clear');
    await userEvent.click(clearBtn);
    expect(canvas.getByText('Controlled select')).toBeInTheDocument();
  }
};

export const Playground: Story = {
  args: {
    multiple: false,
    clearable: true,
    disabled: false,
    placeholder: 'Play with me'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground. Change props in Controls panel and watch live updates + Actions tab.'
      }
    }
  }
};
