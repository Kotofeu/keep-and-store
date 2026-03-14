'use client';
import { useState, useMemo, useCallback, UIEvent } from 'react';

interface UseVirtualListProps<T> {
  items: T[];
  itemHeight: number;
  overscan?: number;
}

export const useVirtualList = <T>({ items, itemHeight, overscan = 5 }: UseVirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = useMemo(() => items.length * itemHeight, [items.length, itemHeight]);

  const getVirtualItems = useCallback(
    (containerHeight: number) => {
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
      const endIndex = Math.min(items.length, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan);

      return items.slice(startIndex, endIndex).map((item, relativeIndex) => {
        const index = startIndex + relativeIndex;
        return {
          item,
          index,
          top: index * itemHeight
        };
      });
    },
    [items, scrollTop, itemHeight, overscan]
  );

  return {
    totalHeight,
    getVirtualItems,
    onScroll: (e: UIEvent<HTMLElement>) => setScrollTop(e.currentTarget.scrollTop),
    scrollTop
  };
};
