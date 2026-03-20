import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { throttle } from './throttle';

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the function immediately on the first call (leading edge)', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('does not call again if invoked within the delay period', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('calls the trailing function after the delay when called during the delay', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('only executes the last trailing call when multiple calls occur', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled(1);
    throttled(2);
    throttled(3);
    throttled(4);

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenLastCalledWith(1);

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenLastCalledWith(4);
  });

  it('allows a new call after the delay has passed (cooldown)', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    vi.advanceTimersByTime(100);
    throttled();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('cancels a pending trailing call when cancel() is invoked', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled.cancel();
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('preserves the `this` context of the original function', () => {
    const obj = {
      value: 42,
      method(this: { value: number }) {
        return this.value;
      }
    };
    const spy = vi.fn(obj.method);
    obj.method = spy;

    const throttled = throttle(obj.method, 100);
    throttled.call(obj);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.results[0].value).toBe(42);
  });

  it('passes the correct arguments to the function', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled('a', 'b');
    throttled('c', 'd');

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenLastCalledWith('a', 'b');

    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenLastCalledWith('c', 'd');
  });

  it('works correctly with a delay of 0 (every call is immediate)', () => {
    const func = vi.fn();
    const throttled = throttle(func, 0);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(3);
  });

  it('handles a large delay correctly', () => {
    const func = vi.fn();
    const throttled = throttle(func, 1000);

    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(500);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('does nothing when cancel is called without pending timeout', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled.cancel();
    throttled();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('allows new calls after cancel (cancel does not permanently disable)', () => {
    const func = vi.fn();
    const throttled = throttle(func, 100);

    throttled();
    throttled();
    throttled.cancel();
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(1);

    throttled();
    expect(func).toHaveBeenCalledTimes(2);
    vi.advanceTimersByTime(100);
    expect(func).toHaveBeenCalledTimes(2);
  });
});
