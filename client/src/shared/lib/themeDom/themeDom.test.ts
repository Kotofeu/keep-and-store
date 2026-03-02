import { describe, it, expect, beforeEach } from 'vitest';
import { Theme, ThemeMode, ThemeVariant, DARK_CLASS, THEME_ATTRIBUTE } from '@shared/types/theme';
import { applyThemeToDom, getThemeFromDom } from './themeDom';

describe('themeDom', () => {
  beforeEach(() => {
    document.documentElement.removeAttribute(THEME_ATTRIBUTE);
    document.documentElement.classList.remove(DARK_CLASS);
  });

  describe('applyThemeToDom', () => {
    it('sets theme attribute and dark class for notepad dark theme', () => {
      const theme: Theme = { variant: ThemeVariant.NOTEPAD, mode: ThemeMode.DARK };
      applyThemeToDom(theme);
      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(ThemeVariant.NOTEPAD);
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
    });

    it('sets theme attribute and removes dark class for notepad light theme', () => {
      const theme: Theme = { variant: ThemeVariant.NOTEPAD, mode: ThemeMode.LIGHT };
      document.documentElement.classList.add(DARK_CLASS);
      applyThemeToDom(theme);

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(ThemeVariant.NOTEPAD);
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(false);
    });

    it('sets theme attribute and dark class for standard dark theme', () => {
      const theme: Theme = { variant: ThemeVariant.STANDARD, mode: ThemeMode.DARK };
      applyThemeToDom(theme);

      expect(document.documentElement.getAttribute(THEME_ATTRIBUTE)).toBe(ThemeVariant.STANDARD);
      expect(document.documentElement.classList.contains(DARK_CLASS)).toBe(true);
    });

    it('does nothing if document is undefined (server-side)', () => {
      const originalDocument = global.document;
      // @ts-expect-error - simulation of the server environment
      delete global.document;

      expect(() => {
        applyThemeToDom({ variant: ThemeVariant.STANDARD, mode: ThemeMode.LIGHT });
      }).not.toThrow();
      global.document = originalDocument;
    });
  });

  describe('getThemeFromDom', () => {
    it('returns notepad dark theme based on current DOM state', () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, ThemeVariant.NOTEPAD);
      document.documentElement.classList.add(DARK_CLASS);

      expect(getThemeFromDom()).toEqual({
        variant: ThemeVariant.NOTEPAD,
        mode: ThemeMode.DARK
      });
    });

    it('returns standard light theme when dark class is absent and attribute is standard', () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, ThemeVariant.STANDARD);
      expect(getThemeFromDom()).toEqual({
        variant: ThemeVariant.STANDARD,
        mode: ThemeMode.LIGHT
      });
    });

    it('returns notepad light theme from DOM', () => {
      document.documentElement.setAttribute(THEME_ATTRIBUTE, ThemeVariant.NOTEPAD);
      document.documentElement.classList.remove(DARK_CLASS);

      expect(getThemeFromDom()).toEqual({
        variant: ThemeVariant.NOTEPAD,
        mode: ThemeMode.LIGHT
      });
    });

    it('falls back to STANDARD variant if attribute is missing', () => {
      expect(getThemeFromDom()).toEqual({
        variant: ThemeVariant.STANDARD,
        mode: ThemeMode.LIGHT
      });
    });

    it('detects dark mode from class even if attribute is missing', () => {
      document.documentElement.classList.add(DARK_CLASS);

      expect(getThemeFromDom()).toEqual({
        variant: ThemeVariant.STANDARD,
        mode: ThemeMode.DARK
      });
    });

    it('returns default theme if document is undefined (server-side)', () => {
      const originalDocument = global.document;
      // @ts-expect-error - simulation of the server environment
      delete global.document;

      expect(getThemeFromDom()).toEqual({
        variant: ThemeVariant.STANDARD,
        mode: ThemeMode.LIGHT
      });

      global.document = originalDocument;
    });
  });
});
