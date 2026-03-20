'use client';

import { type ReactNode, type KeyboardEvent, MouseEvent, forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { Icon } from '@shared/ui/icon';
import { cn } from '@shared/utils/cn';

const selectTriggerVariants = cva(
  [
    'border-input-border bg-input-background text-input-text',
    'flex min-h-11 w-full items-center justify-between rounded-md border px-2 py-1.5 transition-all'
  ],
  {
    variants: {
      isOpen: {
        true: 'border-input-border-focus ring-input-border-focus ring-1'
      },
      disabled: {
        true: 'bg-input-background-disabled border-input-border-disabled text-input-text-disabled cursor-not-allowed'
      },
      error: {
        true: 'border-input-border-error focus:border-input-border-error focus:ring-input-border-error'
      }
    },
    compoundVariants: [
      {
        disabled: true,
        error: true,
        class:
          'border-input-border-error-disabled bg-input-background-disabled text-input-text-disabled cursor-not-allowed'
      },
      {
        disabled: true,
        class: 'hover:border-input-border-disabled focus:border-input-border-disabled focus:ring-0'
      },
      {
        disabled: true,
        error: true,
        class: 'hover:border-input-border-error-disabled focus:border-input-border-error-disabled focus:ring-0'
      }
    ]
  }
);

interface SelectTriggerProps {
  listboxId: string;
  ariaLabel?: string;
  isOpen: boolean;
  disabled: boolean;
  hasValue: boolean;
  clearable?: boolean;
  multiple?: boolean;
  error?: string | boolean;
  displayContent: ReactNode;
  onClear?: (e: MouseEvent) => void;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}

export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  (
    {
      listboxId,
      ariaLabel,
      isOpen,
      disabled,
      hasValue,
      clearable,
      multiple,
      error,
      displayContent,
      onClear,
      onClick,
      onKeyDown
    },
    ref
  ) => {
    const showClear = hasValue && (multiple || clearable);

    return (
      <div
        className={cn(selectTriggerVariants({ isOpen, disabled, error: !!error }))}
        ref={ref}
        role="combobox"
        aria-expanded={isOpen && !disabled}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        aria-label={ariaLabel}
        aria-invalid={!!error}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">{displayContent}</div>
        <div className="ml-3 flex items-center gap-3">
          {showClear && onClear && (
            <button
              type="button"
              onClick={onClear}
              className={cn('flex', !disabled ? 'cursor-pointer' : 'pointer-events-none')}
              aria-label="Clear selection"
              disabled={disabled}
            >
              <Icon type="cross" className="h-3 w-3" />
            </button>
          )}
          <div className="bg-input-border h-5 w-px" aria-hidden="true" />
          <span className={cn('flex transition-transform duration-200', isOpen && 'rotate-180')}>
            <Icon type="arrowDown" className="h-5 w-5" />
          </span>
        </div>
      </div>
    );
  }
);
