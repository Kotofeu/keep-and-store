import { describe, it, expect } from 'vitest';
import { ThemeVariantEnum } from '@shared/types/theme';
import { getStyleTheme, isDarkTheme, combineTheme } from './theme-parser';

describe('getStyleTheme', () => {
  it('should extract "standard" from standard-light', () => {
    expect(getStyleTheme(ThemeVariantEnum.STANDARD_LIGHT)).toBe('standard');
  });

  it('should extract "standard" from standard-dark', () => {
    expect(getStyleTheme(ThemeVariantEnum.STANDARD_DARK)).toBe('standard');
  });

  it('should extract "notepad" from notepad-light', () => {
    expect(getStyleTheme(ThemeVariantEnum.NOTEPAD_LIGHT)).toBe('notepad');
  });

  it('should extract "notepad" from notepad-dark', () => {
    expect(getStyleTheme(ThemeVariantEnum.NOTEPAD_DARK)).toBe('notepad');
  });
});

describe('isDarkTheme', () => {
  it('should return false for light themes', () => {
    expect(isDarkTheme(ThemeVariantEnum.STANDARD_LIGHT)).toBe(false);
    expect(isDarkTheme(ThemeVariantEnum.NOTEPAD_LIGHT)).toBe(false);
  });

  it('should return true for dark themes', () => {
    expect(isDarkTheme(ThemeVariantEnum.STANDARD_DARK)).toBe(true);
    expect(isDarkTheme(ThemeVariantEnum.NOTEPAD_DARK)).toBe(true);
  });
});

describe('combineTheme', () => {
  it('should combine "standard" with dark flag to standard-dark', () => {
    expect(combineTheme('standard', true)).toBe(ThemeVariantEnum.STANDARD_DARK);
  });

  it('should combine "standard" with light flag to standard-light', () => {
    expect(combineTheme('standard', false)).toBe(ThemeVariantEnum.STANDARD_LIGHT);
  });

  it('should combine "notepad" with dark flag to notepad-dark', () => {
    expect(combineTheme('notepad', true)).toBe(ThemeVariantEnum.NOTEPAD_DARK);
  });

  it('should combine "notepad" with light flag to notepad-light', () => {
    expect(combineTheme('notepad', false)).toBe(ThemeVariantEnum.NOTEPAD_LIGHT);
  });
});
