'use client';

import { SelectOption } from '../select-option';
import { Option } from '../types';

interface SelectContentProps<T> {
  isOpen: boolean;
  filteredOptions: Option<T>[];
  selectedOptionValues: string[];
  activeIndex: number;
  isSearchable: boolean;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  handleSelectOption: (option: Option<T>) => void;
  isMultiple: boolean;
  hasValue: boolean;
  isClearable: boolean;
  onClear: () => void;
}

export const SelectContent = <T,>({
  isOpen,
  filteredOptions,
  selectedOptionValues,
  activeIndex,
  isSearchable,
  searchQuery,
  setSearchQuery,
  handleSelectOption,
  isMultiple,
  hasValue,
  isClearable,
  onClear
}: SelectContentProps<T>) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={
        'border-foreground/15 bg-background animate-in fade-in slide-in-from-top-2 absolute left-0 z-50 mt-3 w-full overflow-hidden rounded-3xl border shadow-2xl duration-200'
      }
    >
      {isSearchable && (
        <div className="border-foreground/10 border-b p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            role="searchbox"
            aria-label="Поиск вариантов"
            className={
              'border-input-border bg-input-background text-input-text placeholder:text-input-placeholder focus:border-input-border-focus w-full rounded-3xl border px-5 py-3.5 text-sm focus:outline-none'
            }
            autoFocus
          />
        </div>
      )}

      <ul
        id="select-listbox"
        role="listbox"
        aria-multiselectable={isMultiple}
        aria-activedescendant={
          filteredOptions.length > 0 && activeIndex >= 0
            ? `select-option-${filteredOptions[activeIndex].value}`
            : undefined
        }
        className="scrollbar-thin scrollbar-thumb-foreground/10 max-h-80 overflow-auto py-2"
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option, index) => (
            <SelectOption
              key={option.value}
              option={option}
              isSelected={selectedOptionValues.includes(option.value)}
              isActive={index === activeIndex}
              onClick={() => handleSelectOption(option)}
            />
          ))
        ) : (
          <div className="text-input-placeholder py-12 text-center">
            Ничего не найдено
          </div>
        )}
      </ul>

      {isMultiple && hasValue && isClearable && (
        <div className="border-foreground/10 text-input-placeholder flex items-center justify-between border-t px-5 py-3 text-xs">
          <span>Выбрано: {selectedOptionValues.length}</span>
          <button onClick={onClear} className="text-accent hover:underline">
            Сбросить всё
          </button>
        </div>
      )}
    </div>
  );
};
