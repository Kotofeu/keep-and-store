'use client';
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  RefAttributes,
  ReactElement,
  CSSProperties,
  ForwardedRef,
  useMemo
} from 'react';
import { cva } from 'class-variance-authority';
import { useKeyboardNavigation } from '@shared/hooks/useKeyboardNavigation';
import { cn } from '@shared/utils/cn';
import { Option } from '../types';

const optionVariants = cva('flex items-center gap-3 px-4 py-3 transition-colors focus:outline-none', {
  variants: {
    disabled: {
      true: 'text-input-text-disabled',
      false: 'cursor-pointer'
    },
    selected: {
      true: 'bg-input-option-bg-selected text-input-option-text-selected'
    },
    active: {
      true: 'bg-input-option-bg-hover text-input-option-text-hover'
    }
  },
  compoundVariants: [
    {
      disabled: false,
      active: false,
      class: 'hover:bg-input-option-bg-hover hover:text-input-option-text-hover'
    },
    {
      active: true,
      selected: true,
      class: 'bg-input-option-bg-hover text-input-option-text-hover'
    }
  ],
  defaultVariants: {
    disabled: false,
    active: false,
    selected: false
  }
});

interface SelectContentProps<T> {
  listboxId: string;
  searchPlaceholder: string;
  loadingText: string;
  noResultsText: string;
  searchQuery: string;
  multiple: boolean;
  isOpen: boolean;
  error?: string | boolean;
  options: Option<T>[];
  isLoading: boolean;
  floatingStyle?: CSSProperties;
  onClose: () => void;
  onSearchChange: (value: string) => void;
  getIsSelected: (option: Option<T>) => boolean;
  onOptionSelect: (option: Option<T>) => void;
}

export const SelectContent = forwardRef(
  <T,>(
    {
      listboxId,
      searchPlaceholder,
      loadingText,
      noResultsText,
      searchQuery,
      multiple,
      isOpen,
      error,
      options,
      isLoading,
      floatingStyle,
      onClose,
      onSearchChange,
      getIsSelected,
      onOptionSelect
    }: SelectContentProps<T>,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const searchRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useMemo(() => {
      if (!searchQuery.trim()) {
        return options;
      }
      const term = searchQuery.toLowerCase().trim();
      return options.filter(
        (option) => option.label.toLowerCase().includes(term) || option.value.toLowerCase().includes(term)
      );
    }, [options, searchQuery]);

    const keyboardNavigation = useKeyboardNavigation({
      disabled: isLoading,
      items: filteredOptions,
      activeIndex,
      isLoop: true,
      onSelect: onOptionSelect,
      onEscape: onClose,
      setActiveIndex,
      isItemDisabled: (option) => !!option.disabled
    });

    useEffect(() => {
      if (isOpen) {
        searchRef.current?.focus();
      }
    }, [isOpen]);

    if (!isOpen) {
      return null;
    }

    const activeOptionId =
      activeIndex >= 0 && filteredOptions[activeIndex]
        ? `select-option-${filteredOptions[activeIndex].value}`
        : undefined;

    let message: string | null = null;

    if (isLoading) {
      message = loadingText;
    } else if (error && typeof error === 'string' && !options.length) {
      message = error;
    } else if (filteredOptions.length === 0) {
      message = noResultsText;
    }

    return (
      <div
        ref={ref}
        style={floatingStyle}
        className={cn('border-input-border bg-bg z-50 overflow-hidden rounded-md border shadow-lg')}
      >
        <div className="border-input-border border-b p-2">
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            className={cn(
              'border-input-border bg-input-bg text-input-text placeholder:text-input-placeholder transition-colors',
              'hover:border-input-border-hover focus:border-input-border-focus w-full rounded-md border px-3 py-2 focus:outline-none'
            )}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                onClose();
              }
              if (e.key === 'ArrowDown' && filteredOptions.length > 0) {
                e.preventDefault();
                keyboardNavigation.setActiveIndex(0);
              }
            }}
          />
        </div>

        <ul
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple}
          aria-activedescendant={activeOptionId}
          className="max-h-64 overflow-auto py-1 focus:outline-none"
          onKeyDown={keyboardNavigation.handleKeyDown}
          tabIndex={-1}
        >
          {message ? (
            <li className="text-input-placeholder px-4 py-3">{message}</li>
          ) : (
            filteredOptions.map((option, index) => {
              const selected = getIsSelected(option);
              const isActive = keyboardNavigation.activeIndex === index;
              const isDisabled = !!option.disabled;

              return (
                <li
                  key={option.value}
                  role="option"
                  id={`select-option-${option.value}`}
                  aria-selected={selected}
                  aria-disabled={isDisabled}
                  className={cn(
                    optionVariants({
                      disabled: isDisabled,
                      active: isActive && !isDisabled,
                      selected
                    })
                  )}
                  {...keyboardNavigation.getItemProps(index)}
                >
                  {option.icon && <span className="text-base">{option.icon}</span>}
                  <span className="flex-1">{option.label}</span>
                </li>
              );
            })
          )}
        </ul>
      </div>
    );
  }
) as <T>(props: SelectContentProps<T> & RefAttributes<HTMLDivElement>) => ReactElement;
