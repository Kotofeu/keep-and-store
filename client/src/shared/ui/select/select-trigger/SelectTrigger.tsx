import { type ReactNode, type KeyboardEvent, MouseEvent } from 'react';
import { cn } from '@shared/utils/cn';

interface SelectTriggerProps {
  isOpen: boolean;
  isDisabled: boolean;
  hasValue: boolean;
  displayContent: ReactNode;
  clearable?: boolean;
  onClear?: (e: MouseEvent) => void;
  onClick: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  listboxId: string;
}

export const SelectTrigger = ({
  isOpen,
  isDisabled,
  hasValue,
  displayContent,
  clearable,
  onClear,
  onClick,
  onKeyDown,
  listboxId
}: SelectTriggerProps) => (
  <div
    role="combobox"
    aria-expanded={isOpen}
    aria-haspopup="listbox"
    aria-controls={listboxId}
    tabIndex={isDisabled ? -1 : 0}
    className={cn(
      'border-input-border bg-input-background text-input-text hover:border-input-border-hover focus:border-input-border-focus focus:ring-input-border-focus flex min-h-[42px] w-full items-center justify-between rounded-md border px-4 py-2 transition-all focus:ring-1',
      isDisabled &&
        'bg-input-background-disabled border-input-border-disabled text-input-text-disabled cursor-not-allowed opacity-50',
      isOpen && 'border-input-border-focus ring-input-border-focus ring-1'
    )}
    onClick={onClick}
    onKeyDown={onKeyDown}
  >
    <div className="flex flex-1 flex-wrap items-center gap-2">{displayContent}</div>

    <div className="ml-3 flex items-center gap-2">
      {clearable && hasValue && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="text-input-placeholder hover:text-input-text rounded-full p-1 text-lg leading-none"
          aria-label="Clear selection"
        >
          ×
        </button>
      )}
      <span className={cn('text-input-placeholder text-lg leading-none transition-transform', isOpen && 'rotate-180')}>
        ▼
      </span>
    </div>
  </div>
);
