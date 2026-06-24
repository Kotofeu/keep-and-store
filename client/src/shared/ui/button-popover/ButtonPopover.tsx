'use client';

import {
  useState,
  useRef,
  useCallback,
  cloneElement,
  useId,
  ReactElement,
  ReactNode,
  Ref,
  MouseEventHandler,
  ButtonHTMLAttributes,
  useEffect,
  MouseEvent,
  forwardRef
} from 'react';
import { useMergeRefs, type Placement } from '@floating-ui/react';
import { Icon, IconType } from '@shared/ui/icon';
import { Popover } from '@shared/ui/popover';
import { cn } from '@shared/utils/cn';

interface ButtonPopoverProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'content'> {
  className?: string;
  activeClassName?: string;
  popoverClassName?: string;
  children: ReactNode;
  icon?: IconType;
  iconColor?: string;
  placement?: Placement;
  text?: ReactNode;
  offset?: number;
  autoCloseDelay?: number;
  customButton?: ReactElement<{
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    ref?: Ref<HTMLElement>;
  }>;
  showArrow?: boolean;
  disabled?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
}

export const PopoverButton = forwardRef<HTMLElement, ButtonPopoverProps>((props, ref) => {
  const {
    className,
    activeClassName,
    popoverClassName,
    children,
    icon,
    iconColor,
    text,
    placement = 'bottom',
    offset,
    autoCloseDelay,
    customButton,
    disabled = false,
    showArrow = true,
    onClick: externalOnClick,
    onOpen: externalOnOpen,
    onClose: externalOnClose,
    ...otherProps
  } = props;

  const id = useId();
  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLElement>(null);
  const customRef = customButton?.props?.ref as Ref<HTMLElement> | undefined;
  const mergedRef = useMergeRefs([triggerRef, customRef, ref]);

  const openPopover = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
      externalOnOpen?.();
    }
  }, [disabled, externalOnOpen]);

  const closePopover = useCallback(() => {
    setIsOpen(false);
    externalOnClose?.();
    triggerRef.current?.focus();
  }, [externalOnClose]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    customButton?.props?.onClick?.(e);
    externalOnClick?.(e);
    if (isOpen) {
      closePopover();
    } else {
      openPopover();
    }
  };

  const triggerProps = {
    ...otherProps,
    ref: mergedRef,
    onClick: handleClick,
    'aria-expanded': isOpen,
    'aria-controls': `popover-content-${id}`,
    'aria-haspopup': 'dialog' as const,
    disabled
  } as const;

  const triggerClassName = cn(className, isOpen && activeClassName, customButton?.props?.className);

  const trigger = customButton ? (
    cloneElement(customButton, { ...triggerProps, className: triggerClassName })
  ) : (
    <button {...triggerProps} className={cn(triggerClassName, 'flex items-center gap-2')} type="button">
      {!!icon && <Icon type={icon} color={iconColor} />}
      {text}
    </button>
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Tab') {
        closePopover();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePopover]);

  return (
    <>
      {trigger}
      <Popover
        className={cn('bg-bg border-input-border fill-input-border rounded-lg border p-1 shadow-lg', popoverClassName)}
        id={`popover-content-${id}`}
        isOpen={isOpen}
        anchor={triggerRef}
        content={children}
        showArrow={showArrow}
        placement={placement}
        offset={offset}
        autoCloseDelay={autoCloseDelay}
        onClose={closePopover}
      />
    </>
  );
});

PopoverButton.displayName = 'PopoverButton';
