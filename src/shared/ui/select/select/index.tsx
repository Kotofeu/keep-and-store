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
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const focusedOptionRef = useRef<HTMLLIElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const randomId = useId();

  const [isOpen, setIsOpen] = useClickOutside(ref, undefined, `data-ignore-element="${selectId || randomId}"`);

  const {
    searchValue,
    loadingError,
    focusedIndex,
    isLoading: promiseIsLoading,
    filteredOptions,
    selectedOptions,
    setSearchValue,
    removeAllOptions,
    toggleDropdown,
    handleOptionClick,
    handleRemoveOption,
    onSelectKeyDown,
    itemsListNavigation
  } = useSelectLogic<T>({
    maxSelectedItemsCount,
    isOpen,
    disabled: disabled || isLoading || !!error,
    multiple,
    excludeSelected,
    searchable,
    value,
    options,
    selectorRef,
    focusedOptionRef,
    searchInputRef,
    setIsOpen,
    onChange,
    loadOptions
  });
  const {
    visibleItems: visibleOptions,
    totalHeight: listHeight,
    offsetY: listOffsetY
  } = useVirtualList({
    items: filteredOptions,
    itemHeight,
    overscanCount,
    containerRef: listContainerRef,
    containerHeight: getDropdownHeight(dropdownHeight) / 2,
    gap,
    focusedIndex
  });

  const calcIsLoading = isLoading || promiseIsLoading;
  const calcError = error || loadingError;

  return (
    <SelectComponent
      className={className}
      placeholder={placeholder}
      selectedOptions={selectedOptions}
      selectId={selectId || randomId}
      focusedIndex={focusedIndex}
      visibleOptions={visibleOptions}
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
      searchValue={searchValue}
      success={success}
      warning={warning}
      error={calcError}
      focusedOptionRef={focusedOptionRef}
      searchInputRef={searchInputRef}
      listContainerRef={listContainerRef}
      selectorRef={selectorRef}
      ref={ref}
      onSelectKeyDown={onSelectKeyDown}
      itemsListNavigation={itemsListNavigation}
      onChangeOption={handleOptionClick}
      onSearchChange={setSearchValue}
      toggleDropdown={toggleDropdown}
      onRemoveOption={handleRemoveOption}
      removeAllOptions={removeAllOptions}
    />
  );
};
