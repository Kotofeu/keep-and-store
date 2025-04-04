'use client';
import { CSSProperties, FC, HTMLAttributes, ReactNode, useEffect, useRef, useState, useCallback, useId } from 'react';

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
  backgroundColor = 'var(--tooltip-background-color)',
  color = 'var(--tooltip-color)',
  maxWidth = 250,
  maxHeight = 200,
  offset = 7,
  showDelay = 200,
  children,
  ...otherProps
}) => {
  const randomId = useId();
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipStyles, setTooltipStyles] = useState<TooltipStyles>({});
  const [calculatedMaxWidth, setCalculatedMaxWidth] = useState(maxWidth);
  const [isVisible, setIsVisible] = useClickOutside(targetRef);
  const debounceVisible = useDebounce(isVisible, showDelay);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const updateTooltipPosition = useCallback(() => {
    if (isVisible && targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();

      setTooltipStyles(
        getTooltipPosition({
          targetRect,
          tooltipRect,
          position,
          offset
        })
      );
    }
  }, [isVisible, position, offset]);

  const updateTooltipWidth = useCallback(() => {
    if (isVisible) {
      setCalculatedMaxWidth(getMaxTooltipWidth(maxWidth, offset));
    }
  }, [isVisible, maxWidth, offset]);

  const showTooltip = useCallback(() => setIsVisible(true), [setIsVisible]);
  const hideTooltip = useCallback(() => setIsVisible(false), [setIsVisible]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      frameRef.current = requestAnimationFrame(updateTooltipPosition);
    });

    if (tooltipRef.current) {
      observer.observe(tooltipRef.current);
    }

    return () => {
      observer.disconnect();
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [updateTooltipPosition]);

  useEffect(() => {
    if (isVisible) {
      updateTooltipWidth();
      updateTooltipPosition();

      const handleScroll = () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
        frameRef.current = requestAnimationFrame(updateTooltipPosition);
      };

      window.addEventListener('scroll', handleScroll, true);
      return () => window.removeEventListener('scroll', handleScroll, true);
    }
  }, [isVisible, updateTooltipWidth, updateTooltipPosition]);

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
      onTouchEnd={isTouchDevice ? hideTooltip : undefined}
      onContextMenu={isTouchDevice ? e => e.preventDefault() : undefined}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      aria-describedby={debounceVisible ? `${randomId}-tooltip` : undefined}
    >
      <div
        ref={targetRef}
        className={classNames(styles.wrapper, { [styles.wrapper_visible]: debounceVisible })}
        aria-hidden={!debounceVisible}
      >
        <div className={styles.arrow} style={arrowStyle} aria-hidden />
        <div
          ref={tooltipRef}
          className={classNames(styles.tooltip, { [styles.tooltip_text]: isStringContent })}
          style={tooltipStyle}
          role='tooltip'
          id={`${randomId}-tooltip`}
        >
          {isStringContent ? <span className={styles.content}>{content}</span> : content}
        </div>
      </div>
      {children}
    </div>
  );
};
