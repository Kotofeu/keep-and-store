import { Dispatch, SetStateAction, useEffect } from 'react';

interface UseKeyboardNavigationProps<T> {
  disabled: boolean;
  items: T[];
  activeIndex: number;
  onSelect: (item: T) => void;
  onEscape?: () => void;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export const useKeyboardNavigation = <T>({
  disabled,
  items,
  activeIndex,
  onSelect,
  onEscape,
  setActiveIndex
}: UseKeyboardNavigationProps<T>) => {
  useEffect(() => {
    if (disabled) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          onEscape?.();
          break;

        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => Math.min(prev + 1, items.length - 1));
          break;

        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => Math.max(prev - 1, 0));
          break;

        case 'Enter':
        case ' ':
          e.preventDefault();
          if (items[activeIndex]) {
            onSelect(items[activeIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [disabled, items, activeIndex, setActiveIndex, onSelect, onEscape]);
};
