import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Select } from './Select';
import type { Option } from './types';

const sampleOptions: Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' }
];

const loadFruitsAsync = async (): Promise<Option[]> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
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
      await userEvent.click(canvas.getByText('Apple'));
      expect(canvas.getByText('Apple')).toBeInTheDocument();
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
    const trigger = canvas.getByText('Select an option...');
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByText('Orange'));

    // Clear button should not appear
    expect(canvas.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
  }
};

export const AsyncLoading: Story = {
  args: {
    loadOptions: loadFruitsAsync,
    placeholder: 'Load fruits...',
    options: undefined // используем loadOptions
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByText('Load fruits...');

    await step('Open → wait loading → select', async () => {
      await userEvent.click(trigger);
      const apple = await canvas.findByText('Apple'); // ждёт загрузки
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
