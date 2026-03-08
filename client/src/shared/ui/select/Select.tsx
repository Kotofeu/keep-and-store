'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useKeyboardNavigation } from '@shared/hooks/useKeyboardNavigation';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import { Option, SelectValue } from './types';

interface SelectProps<T = unknown> {
  className?: string;
  options: Option<T>[];
  value: SelectValue<T>;
  placeholder?: string;
  isMultiple?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  disabled?: boolean;
  onChange: (value: SelectValue<T>) => void;
}

export const Select = <T,>({
  options,
  value,
  onChange,
  isMultiple = false,
  isSearchable = true,
  isClearable = true,
  disabled = false,
  placeholder = 'Choose...',
  className
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOptions = useMemo((): Option<T>[] => {
    if (value === null) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const selectedOptionValues = useMemo(
    () => selectedOptions.map((option) => option.value),
    [selectedOptions]
  );

  const hasValue = selectedOptions.length > 0;

  const filteredOptions = useMemo(() => {
    if (!searchQuery || !isSearchable) {
      return options;
    }
    const term = searchQuery.toLowerCase().trim();
    return options.filter((option) =>
      option.label.toLowerCase().includes(term)
    );
  }, [options, searchQuery, isSearchable]);

  const handleSelectOption = (option: Option<T>) => {
    if (isMultiple) {
      const isAlreadySelected = selectedOptions.some(
        (selectedOption) => selectedOption.value === option.value
      );
      const newValue = isAlreadySelected
        ? selectedOptions.filter(
            (selectedOption) => selectedOption.value !== option.value
          )
        : [...selectedOptions, option];
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
    }
    setSearchQuery('');
  };

  const handleClear = () => {
    onChange(isMultiple ? [] : null);
    setSearchQuery('');
  };

  const handleRemoveOption = (optionToRemove: Option<T>) => {
    if (!isMultiple) {
      return;
    }
    const newValue = selectedOptions.filter(
      (selectedOption) => selectedOption.value !== optionToRemove.value
    );
    onChange(newValue);
  };

  const isKeyboardDisabled = !isOpen || disabled;

  useKeyboardNavigation({
    disabled: isKeyboardDisabled,
    items: filteredOptions,
    activeIndex,
    setActiveIndex,
    onSelect: handleSelectOption,
    onEscape: () => {
      setIsOpen(false);
      setSearchQuery('');
    }
  });

  useEffect(() => {
    setActiveIndex(0);
  }, [filteredOptions]);

  useEffect(() => {
    const handleKeyWhenClosed = (event: KeyboardEvent) => {
      if (isOpen || disabled || document.activeElement !== triggerRef.current) {
        return;
      }
      if (
        event.key === 'ArrowDown' ||
        event.key === 'Enter' ||
        event.key === ' '
      ) {
        event.preventDefault();
        setIsOpen(true);
        setActiveIndex(0);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyWhenClosed);
    return () => document.removeEventListener('keydown', handleKeyWhenClosed);
  }, [isOpen, disabled]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <SelectTrigger
        selectedOptions={selectedOptions}
        placeholder={placeholder}
        isMultiple={isMultiple}
        hasValue={hasValue}
        isOpen={isOpen}
        isClearable={isClearable}
        disabled={disabled}
        onToggle={() => setIsOpen(!isOpen)}
        onClear={handleClear}
        onRemoveOption={handleRemoveOption}
      />

      <SelectContent
        isOpen={isOpen}
        filteredOptions={filteredOptions}
        selectedOptionValues={selectedOptionValues}
        activeIndex={activeIndex}
        isSearchable={isSearchable}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSelectOption={handleSelectOption}
        isMultiple={isMultiple}
        hasValue={hasValue}
        isClearable={isClearable}
        onClear={handleClear}
      />
    </div>
  );
};
