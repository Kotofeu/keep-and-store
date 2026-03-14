import { useRef, useEffect, useCallback, type KeyboardEvent, type Dispatch, type SetStateAction } from 'react';

interface UseKeyboardNavigationProps<T> {
  disabled: boolean;
  items: T[];
  activeIndex: number;
  isLoop?: boolean;
  onSelect: (item: T) => void;
  onEscape?: () => void;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  isItemDisabled?: (item: T) => boolean;
}

export const useKeyboardNavigation = <T>({
  disabled,
  items,
  activeIndex,
  isLoop = true,
  onSelect,
  onEscape,
  setActiveIndex,
  isItemDisabled
}: UseKeyboardNavigationProps<T>) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const isDisabled = useCallback(
    (item: T) => {
      if (isItemDisabled) {
        return isItemDisabled(item);
      }
      return false;
    },
    [isItemDisabled]
  );

  const getNextEnabledIndex = useCallback(
    (current: number, direction: 1 | -1): number => {
      const len = items.length;
      if (len === 0) {
        return -1;
      }

      let next = current + direction;
      if (isLoop) {
        next = ((next % len) + len) % len;
      } else {
        next = Math.max(0, Math.min(len - 1, next));
      }

      let steps = 0;
      while (steps < len) {
        if (!isDisabled(items[next])) {
          return next;
        }

        next = isLoop
          ? (next + direction + len) % len
          : direction === 1
            ? Math.min(len - 1, next + 1)
            : Math.max(0, next - 1);

        if (!isLoop && ((direction === 1 && next <= current) || (direction === -1 && next >= current))) {
          return current;
        }
        steps++;
      }
      return current;
    },
    [items, isLoop, isDisabled]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (disabled || items.length === 0) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => getNextEnabledIndex(prev, 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => getNextEnabledIndex(prev, -1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < items.length && !isDisabled(items[activeIndex])) {
            onSelect(items[activeIndex]);
          }
          break;
        case 'Escape':
          onEscape?.();
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(() => {
            for (let i = 0; i < items.length; i++) {
              if (!isDisabled(items[i])) {
                return i;
              }
            }
            return 0;
          });
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(() => {
            for (let i = items.length - 1; i >= 0; i--) {
              if (!isDisabled(items[i])) {
                return i;
              }
            }
            return items.length - 1;
          });
          break;
      }
    },
    [disabled, items, setActiveIndex, activeIndex, isDisabled, onEscape, getNextEnabledIndex, onSelect]
  );

  useEffect(() => {
    if (activeIndex >= 0 && itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(-1);
    itemRefs.current = [];
  }, [items, setActiveIndex]);

  const getItemProps = useCallback(
    (index: number) => ({
      ref: (el: HTMLLIElement | null) => {
        itemRefs.current[index] = el;
      },
      tabIndex: activeIndex === index ? 0 : -1,
      onClick: () => onSelect(items[index])
    }),
    [activeIndex, items, onSelect]
  );

  return {
    activeIndex,
    setActiveIndex,
    handleKeyDown,
    getItemProps
  };
};
