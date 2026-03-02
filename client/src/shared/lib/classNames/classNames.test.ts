import { describe, it, expect } from 'vitest';
import { cn } from './classNames';

describe('cn utility', () => {
  it('joins basic classes', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('filters falsy values', () => {
    expect(cn('a', false, null, undefined, '', 0)).toBe('a');
  });

  it('handles arrays and nested structures like clsx', () => {
    expect(cn(['a', ['b', { c: true, d: false }]])).toBe('a b c');
  });

  it('merges conflicting tailwind classes (padding x)', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  it('merges conflicting tailwind classes (text alignment)', () => {
    expect(cn('text-left', 'text-right')).toBe('text-right');
  });

  it('resolves multiple conflicts with order', () => {
    expect(cn('p-2 px-4', 'p-3')).toBe('p-3');
  });

  it('returns empty string for no args', () => {
    expect(cn()).toBe('');
  });

  it('works with object class maps', () => {
    expect(cn({ a: true, b: false }, 'c')).toBe('a c');
  });
});
