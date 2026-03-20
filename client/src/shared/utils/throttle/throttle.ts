/* eslint-disable @typescript-eslint/no-explicit-any */

type ThrottledFunction<T extends (...args: any[]) => any> = {
  (this: ThisParameterType<T>, ...args: Parameters<T>): void;
  cancel: () => void;
};

export function throttle<T extends (...args: any[]) => any>(func: T, delay: number): ThrottledFunction<T> {
  let lastCall = 0;
  let timeout: NodeJS.Timeout | null = null;

  const throttledFunc: ThrottledFunction<T> = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now();

    if (now - lastCall >= delay) {
      func.apply(this, args);
      lastCall = now;
    } else {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(
        () => {
          func.apply(this, args);
          lastCall = Date.now();
          timeout = null;
        },
        delay - (now - lastCall)
      );
    }
  };

  throttledFunc.cancel = function () {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return throttledFunc;
}
