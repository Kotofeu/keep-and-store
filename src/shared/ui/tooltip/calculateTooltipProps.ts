import { CSSProperties } from 'react';

export interface TooltipStyles {
  tooltipStyle?: CSSProperties;
  arrowStyle?: CSSProperties;
}

interface CalculateTooltipPositionParams {
  targetRect: DOMRect;
  tooltipRect: DOMRect;
  position: 'top' | 'left' | 'bottom' | 'right' | 'auto';
  offset: number;
}

export const getMaxTooltipWidth = (maxWidth: number, offset: number): number => {
  const viewportWidth = document.documentElement.clientWidth;
  return Math.min(maxWidth, viewportWidth - offset * 2);
};

export const getTooltipPosition = ({
  targetRect,
  tooltipRect,
  position,
  offset
}: CalculateTooltipPositionParams): TooltipStyles => {
  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;

  const calculatePosition = (pos: 'top' | 'left' | 'bottom' | 'right') => {
    let arrowStyle: CSSProperties = {};
    let tooltipStyle: CSSProperties = {};

    switch (pos) {
      case 'top':
      case 'bottom': {
        const targetCenter = Math.max(
          offset * 2.5,
          Math.min(targetRect.x + targetRect.width / 2, viewportWidth - offset * 2.5)
        );
        const left = targetCenter - tooltipRect.width / 2;
        const clampedLeft = Math.max(offset, Math.min(left, viewportWidth - tooltipRect.width - offset));
        arrowStyle = {
          [pos]: `-${offset + 1}px`,
          left: '50%',
          transform: `translateX(-50%)${pos === 'bottom' ? ' rotate(180deg)' : ''}`
        };

        tooltipStyle = {
          [pos]: `-${tooltipRect.height + offset}px`,
          left: `calc(50% + ${clampedLeft - targetCenter + tooltipRect.width / 2}px)`,
          transform: 'translateX(-50%)'
        };
        break;
      }
      case 'left':
      case 'right': {
        const targetCenter = Math.max(
          offset * 2.5,
          Math.min(targetRect.y + targetRect.height / 2, viewportHeight - offset * 2.5)
        );
        const top = targetCenter - tooltipRect.height / 2;
        const clampedTop = Math.max(offset, Math.min(top, viewportHeight - tooltipRect.height - offset));

        arrowStyle = {
          top: '50%',
          [pos]: `-${offset + 1}px`,
          transform: `translateY(-50%) ${pos === 'left' ? 'rotate(270deg)' : 'rotate(90deg)'}`
        };

        tooltipStyle = {
          top: `calc(50% + ${clampedTop - targetCenter + tooltipRect.height / 2}px)`,
          [pos]: `-${tooltipRect.width + offset}px`,
          transform: 'translateY(-50%)'
        };
        break;
      }
    }
    return { tooltipStyle, arrowStyle };
  };

  if (position === 'auto') {
    const positions = ['top', 'bottom', 'right', 'left'] as const;

    for (const pos of positions) {
      const { tooltipStyle, arrowStyle } = calculatePosition(pos);
      if (
        (pos === 'top' && targetRect.top >= tooltipRect.height + offset) ||
        (pos === 'bottom' && viewportHeight - targetRect.bottom >= tooltipRect.height + offset) ||
        (pos === 'right' && viewportWidth - targetRect.right >= tooltipRect.width + offset) ||
        (pos === 'left' && targetRect.left >= tooltipRect.width + offset)
      ) {
        return { tooltipStyle, arrowStyle };
      }
    }
  } else {
    return calculatePosition(position);
  }
  return {
    tooltipStyle: {
      bottom: offset,
      left: offset,
      right: offset,
      position: 'fixed',
      marginLeft: 'auto'
    },
    arrowStyle: { display: 'none' }
  };
};
