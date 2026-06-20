import { createRef } from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders } from '@shared/testing';
import { Select } from './Select';
import type { Option, SelectRef } from './types';

const sampleOptions: Option[] = [
  { value: 'apple', label: 'Apple', icon: 'success' },
  { value: 'banana', label: 'Banana', icon: 'error' },
  { value: 'orange', label: 'Orange', icon: 'warning' },
  { value: 'grape', label: 'Grape', icon: 'success', disabled: true }
];

describe('Select', () => {
  const user = userEvent.setup();

  describe('Basic rendering', () => {
    it('renders with default placeholder', () => {
      renderWithProviders(<Select options={sampleOptions} />);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('renders custom placeholder', () => {
      renderWithProviders(<Select options={sampleOptions} placeholder="Choose fruit" />);
      expect(screen.getByText('Choose fruit')).toBeInTheDocument();
    });

    it('renders with selected option', async () => {
      renderWithProviders(<Select options={sampleOptions} defaultValue={sampleOptions[0]} />);
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('applies error styles', () => {
      renderWithProviders(<Select options={sampleOptions} error="Something went wrong" />);
      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('border-input-border-error');
    });

    it('does not open when disabled', async () => {
      renderWithProviders(<Select options={sampleOptions} disabled />);
      await user.click(screen.getByText('Select option'));
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  describe('Single selection (uncontrolled)', () => {
    it('selects option and displays it', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Banana'));
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('calls onChange with selected option', async () => {
      const onChange = vi.fn();
      renderWithProviders(<Select options={sampleOptions} onChange={onChange} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Orange'));
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(sampleOptions[2]);
    });

    it('respects defaultValue', () => {
      renderWithProviders(<Select options={sampleOptions} defaultValue={sampleOptions[1]} />);
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('clears selection when clearable and clear button clicked', async () => {
      const onChange = vi.fn();
      renderWithProviders(
        <Select options={sampleOptions} defaultValue={sampleOptions[0]} clearable onChange={onChange} />
      );
      const clearBtn = screen.getByRole('button', { name: /clear/i });
      await user.click(clearBtn);
      expect(screen.getByText('Select option')).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('does not show clear button when not clearable', () => {
      renderWithProviders(<Select options={sampleOptions} defaultValue={sampleOptions[0]} clearable={false} />);
      expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument();
    });

    it('closes dropdown after selection', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Grape'));
      expect(screen.getByText('Grape')).toBeVisible();
      await user.click(screen.getByText('Apple'));
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });

    it('does not select disabled option', async () => {
      const onChange = vi.fn();
      renderWithProviders(<Select options={sampleOptions} onChange={onChange} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Grape'));
      expect(onChange).not.toHaveBeenCalled();
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });
  });

  describe('Multiple selection', () => {
    it('selects multiple options and displays chips', async () => {
      renderWithProviders(<Select multiple options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Apple'));
      await user.click(screen.getByText('Orange'));
      expect(screen.getByRole('button', { name: /Remove Apple/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Remove Orange/i })).toBeInTheDocument();
    });

    it('calls onChange with array of selected options', async () => {
      const onChange = vi.fn();
      renderWithProviders(<Select multiple options={sampleOptions} onChange={onChange} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalledWith([sampleOptions[0]]);
      await user.click(screen.getByText('Orange'));
      expect(onChange).toHaveBeenCalledWith([sampleOptions[0], sampleOptions[2]]);
    });

    it('removes chip when clicking ×', async () => {
      const onChange = vi.fn();
      renderWithProviders(
        <Select
          multiple
          options={sampleOptions}
          defaultValue={[sampleOptions[0], sampleOptions[1]]}
          onChange={onChange}
        />
      );
      const removeApple = screen.getByRole('button', { name: /Remove Apple/i });
      await user.click(removeApple);
      expect(screen.queryByRole('button', { name: /Remove Apple/i })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Remove Banana/i })).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledWith([sampleOptions[1]]);
    });

    it('keeps dropdown open after selection', async () => {
      renderWithProviders(<Select multiple options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Apple'));
      expect(screen.getByText('Banana')).toBeVisible();
    });

    it('clears all selections when clearable and clear button clicked', async () => {
      const onChange = vi.fn();
      renderWithProviders(
        <Select
          multiple
          options={sampleOptions}
          defaultValue={[sampleOptions[0], sampleOptions[1]]}
          clearable
          onChange={onChange}
        />
      );
      const clearBtn = screen.getByRole('button', { name: /clear/i });
      await user.click(clearBtn);
      expect(screen.queryByRole('button', { name: /Remove Apple/i })).not.toBeInTheDocument();
      expect(screen.getByText('Select option')).toBeInTheDocument();
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('shows clear button when multiple and has selections', () => {
      renderWithProviders(<Select multiple options={sampleOptions} defaultValue={[sampleOptions[0]]} />);
      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('opens dropdown with Enter on trigger', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      await user.type(trigger, '{Enter}');
      expect(await screen.findByText('Apple')).toBeVisible();
    });

    it('opens dropdown with Space on trigger', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      await user.type(trigger, ' ');
      expect(await screen.findByText('Apple')).toBeVisible();
    });

    it('opens dropdown with ArrowDown on trigger', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{ArrowDown}');
      expect(await screen.findByText('Apple')).toBeVisible();
    });

    it('closes dropdown with Escape', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      expect(screen.getByText('Apple')).toBeVisible();
      await user.keyboard('{Escape}');
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      renderWithProviders(
        <div>
          <Select options={sampleOptions} />
          <button>Outside</button>
        </div>
      );
      await user.click(screen.getByText('Select option'));
      expect(screen.getByText('Apple')).toBeVisible();
      await user.click(screen.getByText('Outside'));
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  describe('Search/filtering', () => {
    it('filters options based on search input', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      const search = screen.getByPlaceholderText('Search option');
      await user.type(search, 'ora');
      expect(screen.getByText('Orange')).toBeVisible();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('shows all options when search query is empty', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      const search = screen.getByPlaceholderText('Search option');
      await user.type(search, 'ora');
      await user.clear(search);
      expect(screen.getByText('Apple')).toBeVisible();
      expect(screen.getByText('Banana')).toBeVisible();
    });

    it('clears search when dropdown closes', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      const search = screen.getByPlaceholderText('Search option');
      await user.type(search, 'apple');
      expect(screen.getByText('Apple')).toBeVisible();
      await user.keyboard('{Escape}');
      await user.click(screen.getByText('Select option'));
      expect(screen.getByPlaceholderText('Search option')).toHaveValue('');
      expect(screen.getByText('Apple')).toBeVisible();
    });

    it('searches by both label and value', async () => {
      const customOptions = [
        { value: 'app', label: 'Apple' },
        { value: 'ban', label: 'Banana' }
      ];
      renderWithProviders(<Select options={customOptions} />);
      await user.click(screen.getByText('Select option'));
      const search = screen.getByPlaceholderText('Search option');
      await user.type(search, 'app');
      expect(screen.getByText('Apple')).toBeVisible();
      expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    });
  });

  describe('Async loading (loadOptions)', () => {
    it('loads options on first open', async () => {
      const loadOptions = vi.fn().mockResolvedValue(sampleOptions);
      renderWithProviders(<Select loadOptions={loadOptions} />);
      await user.click(screen.getByRole('combobox'));
      expect(await screen.findByText('Apple')).toBeVisible();
      expect(loadOptions).toHaveBeenCalledTimes(1);
    });

    it('does not load again on subsequent opens', async () => {
      const loadOptions = vi.fn().mockResolvedValue(sampleOptions);
      renderWithProviders(<Select loadOptions={loadOptions} />);
      await user.click(screen.getByRole('combobox'));
      await screen.findByText('Apple');
      await user.keyboard('{Escape}');
      await user.click(screen.getByRole('combobox'));
      expect(loadOptions).toHaveBeenCalledTimes(1);
    });

    it('handles loadOptions error gracefully and shows error in trigger', async () => {
      const loadOptions = vi.fn().mockRejectedValue(new Error('Network error'));
      renderWithProviders(<Select loadOptions={loadOptions} />);
      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        const trigger = screen.getByRole('combobox');
        expect(trigger).toHaveClass('border-input-border-error');
      });
    });

    it('combines loadOptions with search filtering', async () => {
      const loadOptions = vi.fn().mockResolvedValue(sampleOptions);
      renderWithProviders(<Select loadOptions={loadOptions} />);
      await user.click(screen.getByRole('combobox'));
      await screen.findByText('Apple');
      const search = screen.getByPlaceholderText('Search option');
      await user.type(search, 'ban');
      expect(screen.getByText('Banana')).toBeVisible();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });
  });

  describe('Ref methods', () => {
    it('exposes value getter via ref', () => {
      const ref = createRef<SelectRef>();
      renderWithProviders(<Select options={sampleOptions} defaultValue={sampleOptions[0]} ref={ref} />);
      expect(ref.current?.value).toEqual(sampleOptions[0]);
    });

    it('returns null for empty value via ref', () => {
      const ref = createRef<SelectRef>();
      renderWithProviders(<Select options={sampleOptions} ref={ref} />);
      expect(ref.current?.value).toBeUndefined();
    });

    it('exposes open and close methods', async () => {
      const ref = createRef<SelectRef>();
      renderWithProviders(<Select options={sampleOptions} ref={ref} />);
      ref.current?.open();
      expect(await screen.findByText('Apple')).toBeVisible();
      ref.current?.close();
      await waitFor(() => {
        expect(screen.queryByText('Apple')).not.toBeInTheDocument();
      });
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', async () => {
      renderWithProviders(<Select options={[]} />);
      await user.click(screen.getByText('Select option'));
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    it('handles null/undefined options gracefully', () => {
      renderWithProviders(<Select />);
      expect(screen.getByText('Select option')).toBeInTheDocument();
    });

    it('does not crash when onChange is not provided', async () => {
      renderWithProviders(<Select options={sampleOptions} />);
      await user.click(screen.getByText('Select option'));
      await user.click(screen.getByText('Apple'));
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('updates search placeholder via prop', async () => {
      renderWithProviders(<Select options={sampleOptions} searchPlaceholder="Find fruit..." />);
      await user.click(screen.getByText('Select option'));
      expect(screen.getByPlaceholderText('Find fruit...')).toBeInTheDocument();
    });
  });
});
