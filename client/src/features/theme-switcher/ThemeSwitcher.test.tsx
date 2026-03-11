import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as useAppThemeModule from '@shared/hooks/useAppTheme';
import { ThemeSwitcher } from './ThemeSwitcher';

const mockSetBaseTheme = vi.fn();
const mockToggleDark = vi.fn();

const mockUseAppTheme = (overrides?: Partial<ReturnType<typeof useAppThemeModule.useAppTheme>>) => {
  const defaultMock: ReturnType<typeof useAppThemeModule.useAppTheme> = {
    theme: 'standard-light',
    setTheme: vi.fn(),
    baseTheme: 'standard',
    isDark: false,
    setBaseTheme: mockSetBaseTheme,
    toggleDark: mockToggleDark,
    ...overrides
  };
  return vi.spyOn(useAppThemeModule, 'useAppTheme').mockReturnValue(defaultMock);
};

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    mockSetBaseTheme.mockClear();
    mockToggleDark.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders select and button after mount', async () => {
    mockUseAppTheme();
    render(<ThemeSwitcher />);

    const select = await screen.findByRole('combobox');
    const button = await screen.findByRole('button');

    expect(select).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('displays correct button text based on isDark (light)', async () => {
    mockUseAppTheme({ isDark: false });
    render(<ThemeSwitcher />);

    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent('🌙 Тёмная');
  });

  it('displays correct button text based on isDark (dark)', async () => {
    mockUseAppTheme({ isDark: true });
    render(<ThemeSwitcher />);

    const button = await screen.findByRole('button');
    expect(button).toHaveTextContent('☀️ Светлая');
  });

  it('calls setBaseTheme when select value changes', async () => {
    const user = userEvent.setup();
    mockUseAppTheme({ baseTheme: 'standard' });
    render(<ThemeSwitcher />);

    const select = await screen.findByRole('combobox');
    await user.selectOptions(select, 'notepad');

    expect(mockSetBaseTheme).toHaveBeenCalledTimes(1);
    expect(mockSetBaseTheme).toHaveBeenCalledWith('notepad');
  });

  it('calls toggleDark when button is clicked', async () => {
    const user = userEvent.setup();
    mockUseAppTheme();
    render(<ThemeSwitcher />);

    const button = await screen.findByRole('button');
    await user.click(button);

    expect(mockToggleDark).toHaveBeenCalledTimes(1);
  });

  it('select has correct options', async () => {
    mockUseAppTheme();
    render(<ThemeSwitcher />);

    const select = await screen.findByRole('combobox');
    const options = Array.from(select.querySelectorAll('option')).map((opt) => opt.value);

    expect(options).toEqual(['standard', 'notepad']);
  });
});
