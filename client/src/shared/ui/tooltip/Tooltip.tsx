'use client';

import {
  useState,
  useRef,
  ReactNode,
  useCallback,
  ReactElement,
  cloneElement,
  useId,
  Ref,
  useMemo,
  useEffect,
  forwardRef
} from 'react';
import { useMergeRefs, type Placement } from '@floating-ui/react';
import { Popover } from '@shared/ui/popover';
import { cn } from '@shared/utils/cn';

interface TooltipProps {
  className?: string;
  content: ReactNode;
  children: ReactElement;
  placement?: Placement;
  openDelay?: number;
  closeDelay?: number;
  autoCloseDelay?: number;
  offset?: number;
  disabled?: boolean;
}

export const Tooltip = forwardRef<HTMLElement, TooltipProps>((props, ref) => {
  const {
    content,
    children,
    placement = 'top',
    openDelay = 300,
    closeDelay = 150,
    autoCloseDelay,
    className,
    offset,
    disabled = false
  } = props;

  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const isHoveringPopover = useRef(false);

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearTimeouts(), [clearTimeouts]);

  useEffect(() => {
    if (disabled && isOpen) {
      clearTimeouts();
      setIsOpen(false);
    }
  }, [disabled, isOpen, clearTimeouts]);

  const openTooltip = useCallback(() => {
    clearTimeouts();
    if (disabled) {
      return;
    }
    timeoutRef.current = setTimeout(() => setIsOpen(true), openDelay);
  }, [openDelay, clearTimeouts, disabled]);

  const closeTooltip = useCallback(() => {
    clearTimeouts();
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringPopover.current) {
        setIsOpen(false);
      }
    }, closeDelay);
  }, [closeDelay, clearTimeouts]);

  const handleMouseEnter = useCallback(() => openTooltip(), [openTooltip]);
  const handleMouseLeave = useCallback(() => closeTooltip(), [closeTooltip]);

  const mergedRef = useMergeRefs([triggerRef, (children as ReactElement & { ref?: Ref<HTMLElement> })?.ref, ref]);

  const triggerProps = useMemo(
    () => ({
      ref: mergedRef,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      'aria-describedby': isOpen ? `tooltip-content-${id}` : undefined
    }),
    [handleMouseEnter, handleMouseLeave, id, isOpen, mergedRef]
  );

  const trigger = cloneElement(children, triggerProps);

  return (
    <>
      {trigger}
      <Popover
        className={cn(
          'bg-tooltip text-tooltip-text fill-tooltip drop-shadow-tooltip z-tooltip max-w-80 rounded-lg px-2.5 py-1 break-all',
          className
        )}
        id={`tooltip-content-${id}`}
        isOpen={isOpen}
        anchor={triggerRef}
        content={content}
        placement={placement}
        offset={offset}
        role="tooltip"
        autoCloseDelay={autoCloseDelay}
        onClose={closeTooltip}
        onMouseEnter={() => {
          isHoveringPopover.current = true;
        }}
        onMouseLeave={() => {
          isHoveringPopover.current = false;
          closeTooltip();
        }}
      />
    </>
  );
});
