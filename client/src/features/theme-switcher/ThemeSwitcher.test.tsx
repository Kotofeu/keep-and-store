import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAppTheme } from '@shared/hooks/useAppTheme';
import { ThemeSwitcher } from './ThemeSwitcher';

vi.mock('@shared/hooks/useAppTheme', () => ({
  useAppTheme: vi.fn()
}));

const mockUseAppTheme = vi.mocked(useAppTheme);

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    mockUseAppTheme.mockReset();
  });

  const setupMock = (overrides = {}) => {
    mockUseAppTheme.mockReturnValue({
      theme: 'standard-light',
      setTheme: vi.fn(),
      baseTheme: 'standard',
      setBaseTheme: vi.fn(),
      isDark: false,
      toggleDark: vi.fn(),
      ...overrides
    });
  };

  it('рендерит select и кнопку после монтирования', async () => {
    setupMock();
    render(<ThemeSwitcher />);
    expect(await screen.findByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('отображает текущее значение baseTheme в select', async () => {
    setupMock({ baseTheme: 'notepad' });
    render(<ThemeSwitcher />);
    const select = await screen.findByRole('combobox');
    expect(select).toHaveValue('notepad');
  });

  it('отображает текст "🌙 Тёмная" при isDark = false', async () => {
    setupMock({ isDark: false });
    render(<ThemeSwitcher />);
    expect(await screen.findByRole('button')).toHaveTextContent('🌙 Тёмная');
  });

  it('отображает текст "☀️ Светлая" при isDark = true', async () => {
    setupMock({ isDark: true });
    render(<ThemeSwitcher />);
    expect(await screen.findByRole('button')).toHaveTextContent('☀️ Светлая');
  });

  it('вызывает setBaseTheme при изменении select', async () => {
    const mockSetBaseTheme = vi.fn();
    setupMock({ setBaseTheme: mockSetBaseTheme, baseTheme: 'standard' });
    render(<ThemeSwitcher />);

    const select = await screen.findByRole('combobox');
    await userEvent.selectOptions(select, 'notepad');

    await waitFor(() => {
      expect(mockSetBaseTheme).toHaveBeenCalledTimes(1);
      expect(mockSetBaseTheme).toHaveBeenCalledWith('notepad');
    });
  });

  it('вызывает toggleDark при клике на кнопку', async () => {
    const mockToggleDark = vi.fn();
    setupMock({ toggleDark: mockToggleDark });
    render(<ThemeSwitcher />);

    const button = await screen.findByRole('button');
    await userEvent.click(button);

    await waitFor(() => {
      expect(mockToggleDark).toHaveBeenCalledTimes(1);
    });
  });
});
