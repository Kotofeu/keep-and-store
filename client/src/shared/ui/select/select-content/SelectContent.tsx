'use client';
import {
  useRef,
  useEffect,
  useState,
  forwardRef,
  RefAttributes,
  ReactElement,
  CSSProperties,
  ForwardedRef
} from 'react';
import { cva } from 'class-variance-authority';
import { useKeyboardNavigation } from '@shared/hooks/useKeyboardNavigation';
import { cn } from '@shared/utils/cn';
import { Option } from '../types';

const optionVariants = cva('flex items-center gap-3 px-4 py-3 transition-colors', {
  variants: {
    disabled: {
      true: 'text-input-text-disabled cursor-not-allowed',
      false: 'cursor-pointer'
    },
    active: {
      true: 'bg-input-border-focus text-input-text'
    },
    selected: {
      true: 'bg-input-option-selected-bg text-input-option-selected-text'
    }
  },
  compoundVariants: [
    {
      disabled: false,
      active: false,
      class: 'hover:bg-input-border-hover'
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
  multiple: boolean;
  isOpen: boolean;
  searchQuery: string;
  filteredOptions: Option<T>[];
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
      multiple,
      isOpen,
      searchQuery,
      filteredOptions,
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

    return (
      <div
        ref={ref}
        style={floatingStyle}
        className={cn('border-input-border bg-background z-50 overflow-hidden rounded-md border shadow-lg')}
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
              'border-input-border bg-input-background text-input-text placeholder:text-input-placeholder',
              'focus:border-input-border-focus w-full rounded-md border px-3 py-2 focus:outline-none'
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
          {isLoading ? (
            <li className="text-input-placeholder px-4 py-3">Loading...</li>
          ) : filteredOptions.length === 0 ? (
            <li className="text-input-placeholder px-4 py-3">No results found</li>
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
                  className={optionVariants({
                    disabled: isDisabled,
                    active: isActive && !isDisabled,
                    selected
                  })}
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
