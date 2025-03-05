'use client';
import { useId, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { useClickOutside, useKeyboardNavigation, useSelectLogic, useVirtualList } from '@/shared/hooks';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { SelectServer } from '../select-server';
import { dropdownHeightMap, Option, SelectClientProps } from '../types';

const getDropdownHeight = (height: keyof typeof dropdownHeightMap | number): number =>
  typeof height === 'number' ? height : dropdownHeightMap[height];

export const Select = <T,>({
  className,
  placeholder,
  value,
  options = [],
  disabled = false,
  multiple = false,
  searchable = false,
  required = false,
  isLoading = false,
  dropdownHeight = 'medium',
  itemHeight = 34,
  gap = 2,
  overscanCount = 10,
  onChange,
  loadOptions
}: SelectClientProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);
  const selectId = useId();
  const t = useTranslations('Shared.Select');

  const [isOpen, setIsOpen, closeDropdown] = useClickOutside(ref, null, `data-ignore-element="${selectId}"`);

  const {
    selectedOptions,
    searchValue,
    focusedIndex,
    filteredOptions,
    setSearchValue,
    setFocusedIndex,
    handleOptionClick,
    handleRemoveOption,
    removeAllOptions,
    toggleDropdown,
    openSelectByEnter,
    isLoading: promiseIsLoading,
    error: loadingError
  } = useSelectLogic<T>({
    options,
    multiple,
    value,
    isOpen,
    focusedOptionRef,
    setIsOpen,
    disabled: disabled || isLoading,
    onChange,
    loadOptions
  });

  const handleKeyDown = useKeyboardNavigation<Option<T>>({
    disabled: !!disabled,
    items: filteredOptions,
    focusedIndex,
    setFocusedIndex,
    handleEnterClick: handleOptionClick,
    handleEscapeClick: closeDropdown
  });

  const {
    visibleItems,
    totalHeight: listHeight,
    offsetY: listOffsetY,
    containerRef: listContainerRef
  } = useVirtualList({
    items: filteredOptions,
    itemHeight,
    overscanCount,
    containerHeight: getDropdownHeight(dropdownHeight) / 2,
    gap
  });

  const calcIsLoading = isLoading || promiseIsLoading;

  return (
    <div
      className={classNames(styles.select, {}, [className])}
      ref={ref}
      onKeyDown={isOpen && !calcIsLoading && !loadingError ? handleKeyDown : openSelectByEnter}
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
        placeholder={placeholder}
        selectedOptions={selectedOptions}
        selectId={selectId}
        visibleItems={visibleItems}
        searchable={searchable}
        isOpen={isOpen}
        required={required}
        multiple={multiple}
        disabled={disabled}
        isLoading={calcIsLoading}
        dropdownHeight={getDropdownHeight(dropdownHeight)}
        gap={gap}
        itemHeight={itemHeight}
        listHeight={listHeight}
        listOffsetY={listOffsetY}
        focusedIndex={focusedIndex}
        searchValue={searchValue}
        loadingError={loadingError}
        focusedOptionRef={focusedOptionRef}
        listContainerRef={listContainerRef}
        onSearchChange={setSearchValue}
        onChangeOption={handleOptionClick}
        onRemoveOption={handleRemoveOption}
        removeAllOptions={removeAllOptions}
        toggleDropdown={toggleDropdown}
      />
    </div>
  );
};
