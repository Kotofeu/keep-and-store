'use client';
import { FC, useRef } from 'react';

import { useClickOutside, useKeyboardNavigation, useSelectLogic } from '@/shared/hooks';
import { classNames } from '@/shared/lib';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';
import { SelectServer } from '../select-server';

interface SelectClientProps {
  className?: string;
  options: Option[];
  placeholder?: string;
  value?: Option | Option[];
  disabled?: boolean;
  multiple?: boolean;
  searchable?: boolean;
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
  onChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);

  const [isOpen, setIsOpen, closeDropdown] = useClickOutside(ref, menuRef, 'data-remove-button');

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
    !isOpen,
    filteredOptions,
    focusedIndex,
    setFocusedIndex,
    handleOptionClick,
    closeDropdown
  );

  return (
    <div
      className={classNames(styles.select, { [styles.disabled]: !!disabled }, [className])}
      ref={ref}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ padding: 20 }}
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
        onSearchChange={setSearchTerm}
        toggleDropdown={toggleDropdown}
        onChangeOption={handleOptionClick}
        onRemoveOption={handleRemoveOption}
        containerRef={menuRef}
        multiple={multiple}
        focusedOptionRef={focusedOptionRef}
      />
    </div>
  );
};
