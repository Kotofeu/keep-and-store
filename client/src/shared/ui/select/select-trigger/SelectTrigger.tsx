'use client';

import { cn } from '@shared/utils/cn';
import { Option } from '../types';

interface SelectTriggerProps<T> {
  selectedOptions: Option<T>[];
  placeholder: string;
  isMultiple: boolean;
  hasValue: boolean;
  isOpen: boolean;
  isClearable: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onClear: () => void;
  onRemoveOption: (option: Option<T>) => void;
}

export const SelectTrigger = <T,>({
  selectedOptions,
  placeholder,
  isMultiple,
  hasValue,
  isOpen,
  isClearable,
  disabled,
  onToggle,
  onClear,
  onRemoveOption
}: SelectTriggerProps<T>) => (
  <div
    role="combobox"
    aria-haspopup="listbox"
    aria-expanded={isOpen}
    aria-controls={isOpen ? 'select-listbox' : undefined}
    aria-disabled={disabled}
    onClick={onToggle}
    // disabled={disabled}
    className={cn(
      'group',
      'flex w-full items-center justify-between rounded-3xl',
      'bg-input-background border-input-border border',
      'px-5 py-4 text-left transition-all duration-300',
      'hover:border-input-border-hover',
      'focus:border-input-border-focus focus:ring-accent/20 focus:ring-4 focus:outline-none',
      'disabled:border-input-border-disabled disabled:bg-input-background-disabled',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'text-input-text',
      'disabled:text-input-text-disabled'
    )}
  >
    <div className="flex flex-1 flex-wrap gap-2">
      {hasValue ? (
        isMultiple ? (
          selectedOptions.map((selectedOption) => (
            <div
              key={selectedOption.value}
              className="bg-foreground/10 text-input-text flex items-center gap-2 rounded-2xl px-4 py-1.5 text-sm"
            >
              {selectedOption.icon && (
                <span className="text-xl">{selectedOption.icon}</span>
              )}
              <span>{selectedOption.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveOption(selectedOption);
                }}
                aria-label={`Удалить ${selectedOption.label}`}
                className="text-foreground/60 hover:text-foreground ml-1 transition-colors"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="text-input-text flex items-center gap-3">
            {selectedOptions[0].icon && (
              <span className="text-2xl">{selectedOptions[0].icon}</span>
            )}
            <span className="font-medium">{selectedOptions[0].label}</span>
          </div>
        )
      ) : (
        <span className="text-input-placeholder">{placeholder}</span>
      )}
    </div>
    <div className="flex items-center gap-3">
      {isClearable && hasValue && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
          aria-label="Сбросить выбор"
          className={
            'text-foreground/60 hover:bg-foreground/10 hover:text-foreground rounded-full p-1.5 transition-colors'
          }
        >
          x
        </button>
      )}

      <div
        className={`text-foreground/60 group-hover:text-foreground transition-transform duration-300 ${
          isOpen ? 'rotate-180' : ''
        }`}
      >
        v
      </div>
    </div>
  </div>
);
