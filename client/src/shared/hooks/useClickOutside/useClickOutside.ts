import { useEffect, RefObject, useCallback } from 'react';

export const useClickOutside = (
  refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[],
  handler: () => void,
  enabled: boolean = true
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) {
        return;
      }

      const refArray = Array.isArray(refs) ? refs : [refs];
      const isInside = refArray.some((ref) => ref.current?.contains(target));

      if (!isInside) {
        handler();
      }
    },
    [refs, handler]
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick, enabled]);
};
