'use client';
import { CSSProperties, FC, HTMLAttributes, ReactNode, useEffect, useRef, useState, useCallback } from 'react';

import { classNames } from '@/shared/lib';
import { useClickOutside, useDebounce } from '@/shared/hooks';

import styles from './styles.module.scss';
import { getMaxTooltipWidth, getTooltipPosition, TooltipStyles } from './calculateTooltipProps';

interface TooltipWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  className?: string;
  content: ReactNode;
  position?: 'top' | 'left' | 'bottom' | 'right' | 'auto';
  backgroundColor?: string;
  color?: string;
  maxWidth?: number;
  maxHeight?: number;
  offset?: number;
  showDelay?: number;
  children: ReactNode;
}

export const Tooltip: FC<TooltipWrapperProps> = ({
  className,
  content,
  position = 'auto',
  backgroundColor = 'var(--color-black)',
  color = 'var(--tooltip-color)',
  maxWidth = 250,
  maxHeight = 200,
  offset = 7,
  showDelay = 200,
  children,
  ...otherProps
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipStyles, setTooltipStyles] = useState<TooltipStyles>({});
  const [calculatedMaxWidth, setCalculatedMaxWidth] = useState(maxWidth);
  const [isVisible, setIsVisible] = useClickOutside(targetRef);
  const debounceVisible = useDebounce(isVisible, showDelay);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const isLongTouchRef = useRef<boolean>(false);

  useEffect(() => {
    setIsTouchDevice(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const updateTooltipPosition = useCallback(() => {
    if (debounceVisible && targetRef.current && tooltipRef.current) {
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
  }, [debounceVisible, position, offset]);

  const showTooltip = useCallback(() => {
    setCalculatedMaxWidth(getMaxTooltipWidth(maxWidth, offset));
    setIsVisible(true);
    isLongTouchRef.current = true;
  }, [maxWidth, offset, setIsVisible]);

  const hideTooltip = useCallback(() => {
    setIsVisible(false);
    isLongTouchRef.current = false;
  }, [setIsVisible]);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      hideTooltip();
    },
    [hideTooltip]
  );

  useEffect(() => {
    updateTooltipPosition();
    window.addEventListener('resize', updateTooltipPosition);
    window.addEventListener('scroll', updateTooltipPosition, true);

    return () => {
      window.removeEventListener('resize', updateTooltipPosition);
      window.removeEventListener('scroll', updateTooltipPosition, true);
    };
  }, [updateTooltipPosition]);

  const tooltipStyle: CSSProperties = {
    ...tooltipStyles.tooltipStyle,
    backgroundColor,
    color,
    maxHeight,
    maxWidth: calculatedMaxWidth,
    visibility: debounceVisible ? 'visible' : 'hidden'
  };

  const arrowStyle: CSSProperties = {
    ...tooltipStyles.arrowStyle,
    backgroundColor,
    width: offset * 1.5,
    height: offset * 1.5,
    visibility: debounceVisible ? 'visible' : 'hidden'
  };

  const isStringContent = typeof content === 'string';

  return (
    <div
      className={classNames(styles.container, {}, [className])}
      {...otherProps}
      onMouseEnter={!isTouchDevice ? showTooltip : undefined}
      onMouseLeave={!isTouchDevice ? hideTooltip : undefined}
      onTouchStart={isTouchDevice ? showTooltip : undefined}
      onTouchEnd={isTouchDevice ? handleTouchEnd : undefined}
      onContextMenu={isTouchDevice ? e => e.preventDefault() : undefined}
    >
      <div ref={targetRef} className={classNames(styles.wrapper, { [styles.wrapper_visible]: debounceVisible })}>
        <div className={styles.arrow} style={arrowStyle} aria-hidden />
        <div
          ref={tooltipRef}
          className={classNames(styles.tooltip, { [styles.tooltip_text]: isStringContent })}
          style={tooltipStyle}
          role='tooltip'
        >
          {isStringContent ? <span className={styles.content}>{content}</span> : content}
        </div>
      </div>
      {children}
    </div>
  );
};
