import { describe, it, expect } from 'vitest';
import { Theme, ThemeMode, ThemeVariant, DEFAULT_THEME } from '@shared/types/theme';
import { THEME_COOKIE_NAME, parseThemeCookie, serializeThemeCookie } from './themeCookie';

describe('themeCookie', () => {
  describe('parseThemeCookie', () => {
    it('returns default theme when cookie value is empty, null or undefined', () => {
      expect(parseThemeCookie(null)).toEqual(DEFAULT_THEME);
      expect(parseThemeCookie(undefined)).toEqual(DEFAULT_THEME);
      expect(parseThemeCookie('')).toEqual(DEFAULT_THEME);
    });

    it('returns default theme for malformed cookie string', () => {
      expect(parseThemeCookie('standard')).toEqual(DEFAULT_THEME);
      expect(parseThemeCookie('standard:light:extra')).toEqual(DEFAULT_THEME);
      expect(parseThemeCookie('invalid:light')).toEqual(DEFAULT_THEME);
      expect(parseThemeCookie('standard:invalid')).toEqual(DEFAULT_THEME);
    });

    it('parses valid cookie string and decodes URI encoding', () => {
      const cookie = encodeURIComponent('notepad:dark');
      expect(parseThemeCookie(cookie)).toEqual({
        variant: ThemeVariant.NOTEPAD,
        mode: ThemeMode.DARK
      });
    });

    it('handles standard variant correctly', () => {
      const cookie = encodeURIComponent('standard:light');
      expect(parseThemeCookie(cookie)).toEqual({
        variant: ThemeVariant.STANDARD,
        mode: ThemeMode.LIGHT
      });
    });

    it('returns default theme when cookie contains invalid values after decoding', () => {
      const cookie = encodeURIComponent('standard:unknown');
      expect(parseThemeCookie(cookie)).toEqual(DEFAULT_THEME);

      const cookie2 = encodeURIComponent('unknown:light');
      expect(parseThemeCookie(cookie2)).toEqual(DEFAULT_THEME);
    });
  });

  describe('serializeThemeCookie', () => {
    it('returns correct cookie string with encoding for standard light theme', () => {
      const theme: Theme = { variant: ThemeVariant.STANDARD, mode: ThemeMode.LIGHT };
      const result = serializeThemeCookie(theme);
      const expectedValue = encodeURIComponent('standard:light');
      expect(result).toBe(`${THEME_COOKIE_NAME}=${expectedValue}; Path=/; Max-Age=31536000; SameSite=Lax`);
    });

    it('returns correct cookie string for notepad dark theme', () => {
      const theme: Theme = { variant: ThemeVariant.NOTEPAD, mode: ThemeMode.DARK };
      const result = serializeThemeCookie(theme);
      const expectedValue = encodeURIComponent('notepad:dark');
      expect(result).toBe(`${THEME_COOKIE_NAME}=${expectedValue}; Path=/; Max-Age=31536000; SameSite=Lax`);
    });
  });
});
