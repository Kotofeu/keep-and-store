'use client';

import { type ReactNode, type KeyboardEvent, MouseEvent, forwardRef, InputHTMLAttributes, RefObject } from 'react';
import { cva } from 'class-variance-authority';
import { Icon } from '@shared/ui/icon';
import { cn } from '@shared/utils/cn';

const selectTriggerVariants = cva(
  [
    'border-input-border bg-input-bg text-input-text',
    'flex min-h-11 w-full items-center justify-between rounded-md border px-2 py-1.5 transition-colors',
    'hover:border-input-border-hover focus:border-input-border-focus'
  ],
  {
    variants: {
      disabled: {
        true: 'bg-input-bg-disabled border-input-border-disabled text-input-text-disabled cursor-default'
      },
      error: {
        true: 'border-input-border-error hover:border-input-border-error focus:border-input-border-error'
      }
    },
    compoundVariants: [
      {
        disabled: true,
        class: 'hover:border-input-border-disabled focus:border-input-border-disabled'
      },
      {
        disabled: true,
        error: true,
        class:
          'border-input-border-error-disabled bg-input-bg-disabled text-input-text-disabled cursor-default hover:border-input-border-error-disabled focus:border-input-border-error-disabled'
      }
    ]
  }
);

interface SelectTriggerProps extends Omit<InputHTMLAttributes<HTMLDivElement>, 'children' | 'children'> {
  listboxId: string;
  ariaLabel: string;
  clearAriaLabel: string;
  isOpen: boolean;
  disabled: boolean;
  hasValue: boolean;
  clearable?: boolean;
  multiple?: boolean;
  isLoading: boolean;
  error?: string | boolean;
  displayContent: ReactNode;
  floatingRef: RefObject<HTMLDivElement | null>;
  handleClear?: (e: MouseEvent) => void;
  handleClose: () => void;
  handleOpen: () => void;
  handleTriggerKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  (
    {
      listboxId,
      ariaLabel,
      clearAriaLabel,
      isOpen,
      disabled,
      hasValue,
      clearable,
      multiple,
      // TODO adding loader
      isLoading: _isLoading,
      error,
      displayContent,
      title,
      floatingRef,
      handleClear,
      handleClose,
      handleOpen,
      handleTriggerKeyDown,
      ...wrapperProps
    },
    ref
  ) => {
    const showClear = hasValue && (!!multiple || !!clearable) && !!handleClear;

    const handleTriggerClick = () => {
      if (disabled) {
        return;
      }
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    };

    return (
      <div
        {...wrapperProps}
        className={cn(selectTriggerVariants({ disabled, error: !!error }))}
        title={(typeof error === 'string' ? error : undefined) || title}
        ref={ref}
        role="combobox"
        aria-expanded={isOpen && !disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-invalid={!!error}
        onClick={handleTriggerClick}
        onKeyDown={handleTriggerKeyDown}
      >
        <div className="flex flex-1 flex-wrap items-center gap-2">{displayContent}</div>
        <div className="ml-3 flex items-center gap-3">
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              onKeyDown={(e) => e.stopPropagation()}
              className={cn('flex', !disabled ? 'cursor-pointer' : 'pointer-events-none')}
              aria-label={clearAriaLabel}
              disabled={disabled}
            >
              <Icon type="cross" className="h-3 w-3" />
            </button>
          )}
          <div className="bg-icon-primary h-4.5 w-px" aria-hidden="true" />
          <span className={cn('flex transition-transform duration-200', isOpen && 'rotate-180')}>
            <Icon type="arrowDown" className="h-5 w-5" />
          </span>
        </div>
      </div>
    );
  }
);
