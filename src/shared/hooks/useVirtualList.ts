'use client';
import { RefObject, useEffect, useState } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  overscanCount: number;
  gap?: number;
  containerHeight: number;
  focusedIndex?: number;
  containerRef: RefObject<HTMLDivElement | null>;
}

export interface VisibleItem<T> {
  item: T;
  index: number;
}

export const useVirtualList = <T>({
  items,
  itemHeight,
  overscanCount,
  containerHeight,
  containerRef,
  focusedIndex,
  gap = 0
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof focusedIndex !== 'number' || focusedIndex < 0 || focusedIndex >= items.length) {
      return;
    }

    const itemPosition = focusedIndex * itemHeight;
    const itemBottom = itemPosition + itemHeight;
    const containerBottom = container.scrollTop + containerHeight;

    if (itemPosition < container.scrollTop || itemBottom > containerBottom) {
      const newScrollTop = Math.max(0, itemPosition - (containerHeight - itemHeight) / 2);

      container.scrollTo({
        top: newScrollTop,
        behavior: 'auto'
      });

      setScrollTop(newScrollTop);
    }
  }, [focusedIndex, containerRef, containerHeight, itemHeight, items.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscanCount);
  const endIndex = Math.min(items.length - 1, Math.floor((scrollTop + containerHeight) / itemHeight) + overscanCount);

  const visibleItems: VisibleItem<T>[] = items.slice(startIndex, endIndex + 1).map((item, index) => ({
    item,
    index: startIndex + index
  }));

  const offsetY = startIndex * itemHeight;

  const totalHeight = items.length * itemHeight + gap * (visibleItems.length - 1);

  return {
    totalHeight,
    visibleItems,
    offsetY,
    containerRef
  };
};
