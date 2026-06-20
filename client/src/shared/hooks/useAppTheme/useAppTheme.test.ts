import { renderHook, act } from '@testing-library/react';
import { useTheme as useNextTheme } from 'next-themes';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeVariantEnum } from '@shared/types/theme';
import { useAppTheme } from './useAppTheme';

vi.mock('next-themes', () => ({
  useTheme: vi.fn()
}));

describe('useAppTheme', () => {
  const mockSetTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: ThemeVariantEnum.STANDARD_LIGHT,
      setTheme: mockSetTheme
    });
  });

  it('should return correct values for standard-light theme', () => {
    const { result } = renderHook(() => useAppTheme());

    expect(result.current.theme).toBe(ThemeVariantEnum.STANDARD_LIGHT);
    expect(result.current.styleTheme).toBe('standard');
    expect(result.current.isDark).toBe(false);
    expect(result.current.setTheme).toBe(mockSetTheme);
  });

  it('should return correct values for standard-dark theme', () => {
    (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: ThemeVariantEnum.STANDARD_DARK,
      setTheme: mockSetTheme
    });

    const { result } = renderHook(() => useAppTheme());

    expect(result.current.theme).toBe(ThemeVariantEnum.STANDARD_DARK);
    expect(result.current.styleTheme).toBe('standard');
    expect(result.current.isDark).toBe(true);
  });

  it('should return correct values for notepad-light theme', () => {
    (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: ThemeVariantEnum.NOTEPAD_LIGHT,
      setTheme: mockSetTheme
    });

    const { result } = renderHook(() => useAppTheme());

    expect(result.current.theme).toBe(ThemeVariantEnum.NOTEPAD_LIGHT);
    expect(result.current.styleTheme).toBe('notepad');
    expect(result.current.isDark).toBe(false);
  });

  it('should return correct values for notepad-dark theme', () => {
    (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: ThemeVariantEnum.NOTEPAD_DARK,
      setTheme: mockSetTheme
    });

    const { result } = renderHook(() => useAppTheme());

    expect(result.current.theme).toBe(ThemeVariantEnum.NOTEPAD_DARK);
    expect(result.current.styleTheme).toBe('notepad');
    expect(result.current.isDark).toBe(true);
  });

  it('should fallback to standard-light when theme is undefined', () => {
    (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
      theme: undefined,
      setTheme: mockSetTheme
    });

    const { result } = renderHook(() => useAppTheme());

    expect(result.current.theme).toBe(ThemeVariantEnum.STANDARD_LIGHT);
    expect(result.current.styleTheme).toBe('standard');
    expect(result.current.isDark).toBe(false);
  });

  describe('setBaseTheme', () => {
    it('should call setTheme with new base and current isDark (light)', () => {
      const { result } = renderHook(() => useAppTheme());

      act(() => {
        result.current.setStyleTheme('notepad');
      });

      expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariantEnum.NOTEPAD_LIGHT);
    });

    it('should call setTheme with new base and current isDark (dark)', () => {
      (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
        theme: ThemeVariantEnum.STANDARD_DARK,
        setTheme: mockSetTheme
      });

      const { result } = renderHook(() => useAppTheme());

      act(() => {
        result.current.setStyleTheme('notepad');
      });

      expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariantEnum.NOTEPAD_DARK);
    });
  });

  describe('toggleDark', () => {
    it('should toggle from light to dark', () => {
      const { result } = renderHook(() => useAppTheme());

      act(() => {
        result.current.toggleDark();
      });

      expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariantEnum.STANDARD_DARK);
    });

    it('should toggle from dark to light', () => {
      (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
        theme: ThemeVariantEnum.STANDARD_DARK,
        setTheme: mockSetTheme
      });

      const { result } = renderHook(() => useAppTheme());

      act(() => {
        result.current.toggleDark();
      });

      expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariantEnum.STANDARD_LIGHT);
    });

    it('should preserve base theme when toggling', () => {
      (useNextTheme as ReturnType<typeof vi.fn>).mockReturnValue({
        theme: ThemeVariantEnum.NOTEPAD_LIGHT,
        setTheme: mockSetTheme
      });

      const { result } = renderHook(() => useAppTheme());

      act(() => {
        result.current.toggleDark();
      });

      expect(mockSetTheme).toHaveBeenCalledWith(ThemeVariantEnum.NOTEPAD_DARK);
    });
  });
});
