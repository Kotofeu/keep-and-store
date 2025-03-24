'use client';

import { FC, useRef, useState, useEffect, CSSProperties, ReactNode } from 'react';

import { useClickOutside } from '@/shared/hooks';

import { getMaxTooltipWidth, getTooltipPosition, TooltipStyles } from './calculateTooltipProps';
import styles from './styles.module.scss';

interface TooltipProps {
  content: ReactNode;
  position: 'top' | 'left' | 'bottom' | 'right' | 'auto';
  backgroundColor: string;
  color: string;
  maxWidth: number;
  maxHeight: number;
  offset: number;
}

export const ClientTooltip: FC<TooltipProps> = ({
  content,
  position,
  backgroundColor,
  color,
  maxWidth,
  maxHeight,
  offset
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipStyles, setTooltipStyles] = useState<TooltipStyles>({});
  const [calculatedMaxWidth, setCalculatedMaxWidth] = useState(maxWidth);
  const [isVisible, setIsVisible] = useClickOutside(targetRef);

  useEffect(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      const styles = getTooltipPosition({
        targetRect,
        tooltipRect,
        position,
        offset
      });
      setTooltipStyles(styles);
    }
  }, [isVisible, position, offset, calculatedMaxWidth]);

  const showTooltip = () => {
    setCalculatedMaxWidth(getMaxTooltipWidth(maxWidth, offset));
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const clickTooltip = () => {
    isVisible ? hideTooltip() : showTooltip();
  };

  const tooltipStyle: CSSProperties = {
    backgroundColor,
    color,
    maxHeight,
    maxWidth: calculatedMaxWidth,
    ...tooltipStyles.tooltipStyle,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden'
  };

  const arrowStyle: CSSProperties = {
    ...tooltipStyles.arrowStyle,
    backgroundColor,
    width: offset,
    height: offset,
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden'
  };

  return (
    <div
      ref={targetRef}
      className={styles.container}
      onClick={clickTooltip}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      <div ref={tooltipRef} className={styles.tooltip} style={tooltipStyle} data-position={position}>
        <span className={styles.content}>{content}</span>
      </div>
      <div className={styles.arrow} style={arrowStyle} />
    </div>
  );
};
