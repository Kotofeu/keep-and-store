'use client';

import { useId, useRef } from 'react';

import { useClickOutside, useSelectLogic, useVirtualList } from '@/shared/hooks';

import { SelectComponent } from '../select-component';
import { dropdownHeightMap, SelectProps } from '../types';

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
  selectId,
  onChange,
  loadOptions
}: SelectProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const randomId = useId();

  const [isOpen, setIsOpen] = useClickOutside(ref, undefined, `data-ignore-element="${selectId || randomId}"`);

  const {
    searchValue,
    error: loadingError,
    focusedIndex,
    isLoading: promiseIsLoading,
    filteredOptions,
    selectedOptions,
    setSearchValue,
    removeAllOptions,
    toggleDropdown,
    handleOptionClick,
    handleRemoveOption,
    onSelectKeyDown
  } = useSelectLogic<T>({
    maxSelectedItemsCount,
    isOpen,
    disabled: disabled || isLoading || !!error,
    multiple,
    excludeSelected,
    searchable,
    value,
    options,
    focusedOptionRef,
    searchInputRef,
    setIsOpen,
    onChange,
    loadOptions
  });

  const {
    visibleItems,
    totalHeight: listHeight,
    offsetY: listOffsetY
  } = useVirtualList({
    items: filteredOptions,
    itemHeight,
    overscanCount,
    containerRef: listContainerRef,
    containerHeight: getDropdownHeight(dropdownHeight) / 2,
    gap
  });

  const calcIsLoading = isLoading || promiseIsLoading;
  const calcError = error || loadingError;

  return (
    <SelectComponent
      className={className}
      placeholder={placeholder}
      selectedOptions={selectedOptions}
      selectId={selectId || randomId}
      visibleItems={visibleItems}
      searchable={searchable}
      isOpen={isOpen && !calcIsLoading && !disabled}
      required={required}
      multiple={multiple}
      disabled={disabled}
      isLoading={calcIsLoading}
      maxSelectedItemsCount={maxSelectedItemsCount}
      dropdownHeight={getDropdownHeight(dropdownHeight)}
      gap={gap}
      itemHeight={itemHeight}
      listHeight={listHeight}
      listOffsetY={listOffsetY}
      focusedIndex={focusedIndex}
      searchValue={searchValue}
      success={success}
      warning={warning}
      error={calcError}
      focusedOptionRef={focusedOptionRef}
      searchInputRef={searchInputRef}
      listContainerRef={listContainerRef}
      ref={ref}
      onSelectKeyDown={onSelectKeyDown}
      onChangeOption={handleOptionClick}
      onSearchChange={setSearchValue}
      toggleDropdown={toggleDropdown}
      onRemoveOption={handleRemoveOption}
      removeAllOptions={removeAllOptions}
    />
  );
};
