'use client';

import { useId, useRef } from 'react';

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
  excludeSelected = false,
  success = null,
  warning = null,
  error = null,
  dropdownHeight = 'medium',
  itemHeight = 34,
  gap = 2,
  overscanCount = 10,
  maxSelectedItemsCount = 4,
  onChange,
  loadOptions
}: SelectClientProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);
  const selectId = useId();

  const [isOpen, setIsOpen, closeDropdown] = useClickOutside(ref, iconRef, `data-ignore-element="${selectId}"`);

  const {
    selectedOptions,
    searchValue,
    focusedIndex,
    filteredOptions,
    isLoading: promiseIsLoading,
    error: loadingError,
    setSearchValue,
    setFocusedIndex,
    handleOptionClick,
    handleRemoveOption,
    openSelectByEnter,
    removeAllOptions,
    toggleDropdown
  } = useSelectLogic<T>({
    options,
    multiple,
    value,
    isOpen,
    maxSelectedItemsCount,
    disabled: disabled || isLoading || !!error,
    excludeSelected,
    focusedOptionRef,
    setIsOpen,
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
  const calcError = error || loadingError;

  return (
    <div className={classNames(styles.select, {}, [className])}>
      <SelectServer
        className={className}
        placeholder={placeholder}
        selectedOptions={selectedOptions}
        selectId={selectId}
        visibleItems={visibleItems}
        searchable={searchable}
        isOpen={isOpen && !calcIsLoading && !disabled}
        required={required}
        multiple={multiple}
        disabled={disabled}
        isLoading={calcIsLoading}
        dropdownHeight={getDropdownHeight(dropdownHeight)}
        maxSelectedItemsCount={maxSelectedItemsCount}
        gap={gap}
        itemHeight={itemHeight}
        listHeight={listHeight}
        listOffsetY={listOffsetY}
        focusedIndex={focusedIndex}
        searchValue={searchValue}
        success={success}
        warning={warning}
        error={calcError}
        ref={ref}
        focusedOptionRef={focusedOptionRef}
        listContainerRef={listContainerRef}
        onSearchChange={setSearchValue}
        onChangeOption={handleOptionClick}
        onRemoveOption={handleRemoveOption}
        removeAllOptions={removeAllOptions}
        toggleDropdown={toggleDropdown}
        handleKeyDown={handleKeyDown}
        openSelectByEnter={openSelectByEnter}
      />
    </div>
  );
};
