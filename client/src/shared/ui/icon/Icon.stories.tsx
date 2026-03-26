import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within, expect } from 'storybook/test';
import { Icon, ICON_TYPES } from './Icon';

const meta = {
  title: 'shared/Icon',
  component: Icon,
  parameters: { layout: 'centered' },
  argTypes: {
    type: {
      control: 'select',
      options: ICON_TYPES
    },
    className: { control: 'text' },
    iconClassName: { control: 'text' },
    title: { control: 'text' }
  },
  args: { type: 'none' }
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    type: 'success',
    title: 'Example icon'
  }
};

export const AllIcons: Story = {
  render: () => (
    <div className="bg-bg grid grid-cols-2 gap-6 rounded-2xl p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {ICON_TYPES.map((type) => (
        <div key={type} className="flex flex-col items-center gap-2 rounded-lg border p-4">
          <Icon type={type} />
          <span className="text-xs">{type}</span>
        </div>
      ))}
    </div>
  )
};

export const Colors: Story = {
  render: () => (
    <div className="bg-bg flex gap-6 rounded-2xl p-6">
      <div className="flex flex-col items-center gap-2">
        <Icon type="cross" iconClassName="stroke-yellow-500" />
        <span className="text-xs">stroke-yellow-500</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="arrowDown" iconClassName="stroke-red-500" />
        <span className="text-xs">stroke-red-500</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="lightMode" iconClassName="stroke-blue-500" />
        <span className="text-xs">stroke-blue-500</span>
      </div>
    </div>
  )
};

export const Rotated: Story = {
  render: () => (
    <div className="bg-bg flex gap-6 rounded-2xl p-6">
      <div className="flex flex-col items-center gap-2">
        <Icon type="arrowDown" />
        <span className="text-xs">Default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="arrowDown" iconClassName="rotate-180" />
        <span className="text-xs">rotate-180</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon type="arrowDown" iconClassName="rotate-90" />
        <span className="text-xs">rotate-90</span>
      </div>
    </div>
  )
};

export const WithTitle: Story = {
  args: {
    type: 'en',
    title: 'English language'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByTitle('English language');
    await expect(icon).toBeInTheDocument();
  }
};

export const CustomWrapper: Story = {
  args: {
    type: 'warning',
    className: 'bg-foreground p-2 rounded-full shadow-md',
    title: 'Custom wrapper'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvas.getByTitle('Custom wrapper');
    await expect(wrapper).toHaveClass('flex bg-foreground p-2 rounded-full shadow-md');
  }
};
