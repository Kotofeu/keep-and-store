import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeVariant, ThemeMode } from '@shared/types/theme';
import { useTheme, ThemeContext } from './useTheme';

const mockContextValue = {
  theme: { variant: ThemeVariant.STANDARD, mode: ThemeMode.LIGHT },
  setTheme: vi.fn(),
  setVariant: vi.fn(),
  toggleMode: vi.fn()
};

describe('useTheme', () => {
  it('returns context value when used within provider', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockContextValue}>{children}</ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current).toEqual(mockContextValue);
  });

  it('throws error with correct message when used outside provider', () => {
    const consoleError = console.error;
    console.error = vi.fn();

    expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within a ThemeProvider');

    console.error = consoleError;
  });
});
