import { useEffect, useRef, useState } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  overscanCount: number;
  gap?: number;
  containerHeight: number;
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
  gap = 0
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, []);

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
