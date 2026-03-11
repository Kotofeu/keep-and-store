import { useRef, useEffect, useCallback, type KeyboardEvent, type Dispatch, type SetStateAction } from 'react';

interface UseKeyboardNavigationProps<T> {
  disabled: boolean;
  items: T[];
  activeIndex: number;
  isLoop?: boolean;
  onSelect: (item: T) => void;
  onEscape?: () => void;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export const useKeyboardNavigation = <T>({
  disabled,
  items,
  activeIndex,
  isLoop = true,
  onSelect,
  onEscape,
  setActiveIndex
}: UseKeyboardNavigationProps<T>) => {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLElement>) => {
      if (disabled || items.length === 0) {
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : isLoop ? 0 : prev));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => (prev > 0 ? prev - 1 : isLoop ? items.length - 1 : prev));
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < items.length) {
            onSelect(items[activeIndex]);
          }
          break;

        case 'Escape':
          onEscape?.();
          break;

        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;

        case 'End':
          e.preventDefault();
          setActiveIndex(items.length - 1);
          break;
      }
    },
    [disabled, items, activeIndex, isLoop, onSelect, onEscape, setActiveIndex]
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
