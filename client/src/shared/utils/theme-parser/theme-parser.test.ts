import { describe, it, expect } from 'vitest';
import { ThemeVariant } from '@shared/types/theme';
import { getBaseTheme, isDarkTheme, combineTheme } from './theme-parser';

describe('getBaseTheme', () => {
  it('should extract "standard" from standard-light', () => {
    expect(getBaseTheme(ThemeVariant.STANDARD_LIGHT)).toBe('standard');
  });

  it('should extract "standard" from standard-dark', () => {
    expect(getBaseTheme(ThemeVariant.STANDARD_DARK)).toBe('standard');
  });

  it('should extract "notepad" from notepad-light', () => {
    expect(getBaseTheme(ThemeVariant.NOTEPAD_LIGHT)).toBe('notepad');
  });

  it('should extract "notepad" from notepad-dark', () => {
    expect(getBaseTheme(ThemeVariant.NOTEPAD_DARK)).toBe('notepad');
  });
});

describe('isDarkTheme', () => {
  it('should return false for light themes', () => {
    expect(isDarkTheme(ThemeVariant.STANDARD_LIGHT)).toBe(false);
    expect(isDarkTheme(ThemeVariant.NOTEPAD_LIGHT)).toBe(false);
  });

  it('should return true for dark themes', () => {
    expect(isDarkTheme(ThemeVariant.STANDARD_DARK)).toBe(true);
    expect(isDarkTheme(ThemeVariant.NOTEPAD_DARK)).toBe(true);
  });
});

describe('combineTheme', () => {
  it('should combine "standard" with dark flag to standard-dark', () => {
    expect(combineTheme('standard', true)).toBe(ThemeVariant.STANDARD_DARK);
  });

  it('should combine "standard" with light flag to standard-light', () => {
    expect(combineTheme('standard', false)).toBe(ThemeVariant.STANDARD_LIGHT);
  });

  it('should combine "notepad" with dark flag to notepad-dark', () => {
    expect(combineTheme('notepad', true)).toBe(ThemeVariant.NOTEPAD_DARK);
  });

  it('should combine "notepad" with light flag to notepad-light', () => {
    expect(combineTheme('notepad', false)).toBe(ThemeVariant.NOTEPAD_LIGHT);
  });
});
