import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';
import type { Option } from './types';

const sampleOptions: Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
];

describe('Select', () => {
  it('renders placeholder when no value', () => {
    render(<Select options={sampleOptions} placeholder="Test select" />);
    expect(screen.getByText('Test select')).toBeInTheDocument();
  });

  it('opens dropdown and shows options on trigger click', async () => {
    const user = userEvent.setup();
    render(<Select options={sampleOptions} />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('selects single option and calls onChange', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Select options={sampleOptions} onChange={onChange} />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);
    await user.click(screen.getByText('Banana'));

    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ value: 'banana', label: 'Banana' }));
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('supports multiple selection and renders chips', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Select multiple options={sampleOptions} onChange={onChange} />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);
    await user.click(screen.getByText('Apple'));
    await user.click(screen.getByText('Orange'));

    expect(screen.getByRole('button', { name: /Remove Apple/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Remove Orange/i })).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('removes chip on × click in multiple mode', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<Select multiple options={sampleOptions} onChange={onChange} />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);
    await user.click(screen.getByText('Apple'));

    const removeBtn = screen.getByLabelText(/Remove Apple/i);
    await user.click(removeBtn);

    expect(screen.queryByRole('button', { name: /Remove Apple/i })).not.toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('does not open when disabled', async () => {
    const user = userEvent.setup();
    render(<Select options={sampleOptions} disabled />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);

    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });

  it('filters options while typing in search', async () => {
    const user = userEvent.setup();
    render(<Select options={sampleOptions} />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);

    const search = screen.getByPlaceholderText('Search...');
    await user.type(search, 'ora');

    expect(screen.getByText('Orange')).toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
  });

  it('calls loadOptions and shows results after async load', async () => {
    const user = userEvent.setup();
    const loadOptions = vi.fn(async () => {
      await new Promise((r) => setTimeout(r, 100));
      return sampleOptions;
    });

    render(<Select loadOptions={loadOptions} />);

    const trigger = screen.getByText('Select...');
    await user.click(trigger);

    const apple = await screen.findByText('Apple');
    expect(apple).toBeInTheDocument();
    expect(loadOptions).toHaveBeenCalledTimes(1);
  });
});
