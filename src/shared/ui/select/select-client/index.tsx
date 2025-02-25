'use client';
import { FC, KeyboardEvent, useCallback, useEffect, useId, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { useClickOutside, useKeyboardNavigation, useSelectLogic } from '@/shared/hooks';
import { classNames } from '@/shared/lib';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';
import { SelectServer } from '../select-server';

export type DropdownHeight = 'small' | 'medium' | 'large' | number;

interface SelectClientProps {
  className?: string;
  options: Option[];
  placeholder?: string;
  value?: Option | Option[];
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  dropdownHeight?: DropdownHeight;
  onChange?: (option: Option | Option[]) => void;
}

export const Select: FC<SelectClientProps> = ({
  className,
  options,
  placeholder,
  value,
  disabled,
  multiple = false,
  searchable = false,
  dropdownHeight = 'medium',
  onChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);
  const selectId = useId();
  const t = useTranslations('Shared.Select');

  const [isOpen, setIsOpen, closeDropdown] = useClickOutside(ref, null, `data-ignore-element="${selectId}"`);

  const [
    selectedOptions,
    searchTerm,
    focusedIndex,
    filteredOptions,
    setSearchTerm,
    setFocusedIndex,
    handleOptionClick,
    handleRemoveOption,
    toggleDropdown
  ] = useSelectLogic(options, multiple, value, isOpen, setIsOpen, disabled, onChange);

  const [handleKeyDown] = useKeyboardNavigation<Option>(
    !!disabled,
    filteredOptions,
    focusedIndex,
    setFocusedIndex,
    handleOptionClick,
    closeDropdown
  );

  useEffect(() => {
    if (focusedIndex !== undefined && focusedOptionRef.current) {
      focusedOptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [focusedIndex]);

  const handleEnterKey = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !disabled) {
        setIsOpen(true);
      }
    },
    [setIsOpen, disabled]
  );

  return (
    <div
      className={classNames(styles.select, {}, [className])}
      ref={ref}
      onKeyDown={isOpen ? handleKeyDown : handleEnterKey}
      tabIndex={0}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-label={placeholder || t('selectOption')}
      aria-owns={`${selectId}-listbox`}
      aria-controls={`${selectId}-listbox`}
    >
      <SelectServer
        className={className}
        options={filteredOptions}
        placeholder={placeholder}
        selectedOptions={selectedOptions}
        searchable={searchable}
        searchTerm={searchTerm}
        isOpen={isOpen}
        focusedIndex={focusedIndex}
        multiple={multiple}
        focusedOptionRef={focusedOptionRef}
        dropdownHeight={dropdownHeight}
        onSearchChange={setSearchTerm}
        toggleDropdown={toggleDropdown}
        onChangeOption={handleOptionClick}
        onRemoveOption={handleRemoveOption}
        selectId={selectId}
        disabled={disabled}
      />
    </div>
  );
};
