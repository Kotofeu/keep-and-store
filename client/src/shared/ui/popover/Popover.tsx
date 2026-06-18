'use client';

import {
  useEffect,
  useRef,
  ReactNode,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useMemo,
  useLayoutEffect,
  useState,
  HTMLAttributes
} from 'react';
import {
  FloatingArrow,
  useFloating,
  useMergeRefs,
  autoUpdate,
  offset,
  flip,
  shift,
  arrow,
  type Placement
} from '@floating-ui/react';
import { createPortal } from 'react-dom';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { useIsMounted } from '@shared/hooks/useIsMounted';
import { cn } from '@shared/utils/cn';

interface BaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  className?: string;
  content: ReactNode;
  anchor: RefObject<HTMLElement | null>;
  isOpen: boolean;
  showArrow?: boolean;
  placement?: Placement;
  offset?: number;
  transitionDuration?: number;
}

interface WithAutoClose {
  onClose: () => void;
  autoCloseDelay?: number;
}

interface WithoutAutoClose {
  onClose?: never;
  autoCloseDelay?: never;
}

export type PopoverProps = BaseProps & (WithAutoClose | WithoutAutoClose);

export type PopoverRef = {
  element: HTMLDivElement | null;
};

export const Popover = forwardRef<PopoverRef, PopoverProps>((props, ref) => {
  const {
    className,
    content,
    anchor,
    isOpen,
    showArrow = true,
    placement = 'bottom',
    offset: offsetValue = 7,
    autoCloseDelay,
    onClose,
    transitionDuration = 200,
    ...otherProps
  } = props;
  const isMounted = useIsMounted();
  const popoverRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const arrowRef = useRef(null);

  const [isRender, setIsRender] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    let rafId: number;
    let timerId: NodeJS.Timeout;

    if (isOpen) {
      setIsRender(true);
      rafId = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsShow(true);
        });
      });
    } else {
      setIsShow(false);
      timerId = setTimeout(() => {
        setIsRender(false);
      }, transitionDuration);
    }

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isOpen, transitionDuration]);

  const middleware = useMemo(() => {
    const base = [offset(offsetValue), flip({ padding: 12 }), shift({ padding: 8 })];
    return showArrow ? [...base, arrow({ element: arrowRef, padding: Math.round(offsetValue * 1.75) })] : base;
  }, [offsetValue, showArrow]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    placement,
    middleware,
    whileElementsMounted: autoUpdate,
    strategy: 'fixed'
  });

  const mergedRef = useMergeRefs([popoverRef, refs.setFloating]);

  useLayoutEffect(() => {
    if (!anchor) {
      return;
    }
    const element = anchor instanceof HTMLElement ? anchor : anchor.current;
    if (element) {
      refs.setReference(element);
    }
  }, [anchor, refs]);

  useEffect(() => {
    if (!isOpen || !onClose || !autoCloseDelay || autoCloseDelay <= 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      return;
    }

    timeoutRef.current = setTimeout(onClose, autoCloseDelay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, autoCloseDelay, onClose]);

  useClickOutside([popoverRef, anchor], () => onClose?.(), isOpen);

  useImperativeHandle(ref, () => ({
    get element() {
      return popoverRef.current;
    }
  }));

  if (!isMounted || !isRender) {
    return null;
  }

  return createPortal(
    <div
      {...otherProps}
      className={cn('z-popover transition-opacity', isShow ? 'opacity-100' : 'opacity-0', className)}
      style={{ ...floatingStyles, transitionDuration: `${transitionDuration}ms` }}
      ref={mergedRef}
    >
      {showArrow && (
        <FloatingArrow
          className="fill-inherit stroke-inherit"
          ref={arrowRef}
          context={context}
          height={offsetValue}
          width={Math.round(offsetValue * 1.75)}
          tipRadius={2}
        />
      )}
      {content}
    </div>,
    document.body
  );
});
