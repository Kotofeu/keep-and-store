'use client';

import { useRef, useEffect, useState } from 'react';
import { useKeyboardNavigation } from '@shared/hooks/useKeyboardNavigation';
import { cn } from '@shared/utils/cn';
import { SelectOption } from '../select-option';
import { Option } from '../types';

interface SelectContentProps<T> {
  isOpen: boolean;
  onClose: () => void;
  filteredOptions: Option<T>[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  multiple: boolean;
  getIsSelected: (option: Option<T>) => boolean;
  onOptionSelect: (option: Option<T>) => void;
  isLoading: boolean;
  searchPlaceholder: string;
  listboxId: string;
}

export const SelectContent = <T,>({
  isOpen,
  onClose,
  filteredOptions,
  searchQuery,
  onSearchChange,
  multiple,
  getIsSelected,
  onOptionSelect,
  isLoading,
  searchPlaceholder,
  listboxId
}: SelectContentProps<T>) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const keyboardNavigation = useKeyboardNavigation({
    disabled: isLoading,
    items: filteredOptions,
    activeIndex,
    isLoop: true,
    onSelect: onOptionSelect,
    onEscape: onClose,
    setActiveIndex
  });

  useEffect(() => {
    if (isOpen) {
      searchRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="border-input-border bg-background absolute right-0 left-0 z-50 mt-1 overflow-hidden rounded-md border shadow-lg">
      <div className="border-input-border border-b p-2">
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="border-input-border bg-input-background text-input-text placeholder:text-input-placeholder focus:border-input-border-focus w-full rounded-md border px-3 py-2 focus:outline-none"
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
        className="max-h-60 overflow-auto py-1 focus:outline-none"
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
            return (
              <SelectOption
                key={option.value}
                option={option}
                selected={selected}
                multiple={multiple}
                role="option"
                aria-selected={selected}
                className={cn(
                  keyboardNavigation.activeIndex === index && 'bg-input-border-focus text-foreground',
                  selected && !multiple && 'bg-input-border text-input-text'
                )}
                {...keyboardNavigation.getItemProps(index)}
              />
            );
          })
        )}
      </ul>
    </div>
  );
};
