import { KeyboardEvent, useCallback, SetStateAction } from 'react';

type UseKeyboardNavigationProps<T> = {
  disabled: boolean;
  items: T[];
  focusedIndex: number;
  setFocusedIndex: (value: SetStateAction<number>) => void;
  handleEnterClick?: (index: number) => void;
  handleEscapeClick?: () => void;
};

export const useKeyboardNavigation = <T>({
  disabled,
  items,
  focusedIndex,
  setFocusedIndex,
  handleEnterClick,
  handleEscapeClick
}: UseKeyboardNavigationProps<T>): ((e: KeyboardEvent<HTMLDivElement>) => void) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!disabled) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          setFocusedIndex(prev => (prev < items.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          setFocusedIndex(prev => (prev > 0 ? prev - 1 : items.length - 1));
        } else if (e.key === 'Enter' && focusedIndex >= 0 && handleEnterClick) {
          e.preventDefault();
          handleEnterClick(focusedIndex);
        } else if (e.key === 'Escape' && handleEscapeClick) {
          e.preventDefault();
          handleEscapeClick();
        }
      }
    },
    [disabled, items, focusedIndex, setFocusedIndex, handleEnterClick, handleEscapeClick]
  );

  return handleKeyDown;
};
