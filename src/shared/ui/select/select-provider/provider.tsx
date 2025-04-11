'use client';

import { useRef, useMemo } from 'react';

import { useClickOutside, useVirtualList } from '@/shared/hooks';

import { dropdownHeightMap, Option, SelectProviderProps } from '../types';
import { useSelectLogic } from './hook';
import SelectContext from './context';

const getDropdownHeight = (height: keyof typeof dropdownHeightMap | number): number =>
  typeof height === 'number' ? height : dropdownHeightMap[height];

export const SelectProvider = <T,>({
  value,
  options = [],
  disabled = false,
  multiple = false,
  searchable = false,
  required = false,
  isLoading = false,
  excludeSelected = false,
  openPosition = 'auto',
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
  loadOptions,
  children,
  id
}: SelectProviderProps<T>) => {
  const ref = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const focusedOptionRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listContainerRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useClickOutside(ref, undefined, `data-ignore-element="${selectId || id}"`);

  const {
    searchValue,
    loadingError,
    focusedIndex,
    isLoading: promiseIsLoading,
    filteredOptions,
    selectedOptions,
    openPosition: calcOpenPosition,
    setSearchValue,
    removeAllOptions,
    toggleDropdown,
    handleOptionClick,
    handleRemoveOption,
    onSelectKeyDown,
    onSelectNavigation
  } = useSelectLogic<T>({
    maxSelectedItemsCount,
    isOpen,
    disabled: disabled || isLoading || !!error,
    multiple,
    excludeSelected,
    searchable,
    value,
    options,
    dropdownHeight: getDropdownHeight(dropdownHeight),
    openPosition,
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
  } = useVirtualList<Option<T>>({
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

  const contextValue = useMemo(
    () => ({
      selectedOptions,
      selectId: selectId || id,
      focusedIndex,
      visibleOptions,
      searchable,
      isOpen: isOpen && !calcIsLoading && !disabled,
      required,
      multiple,
      disabled,
      isLoading: calcIsLoading,
      maxSelectedItemsCount,
      dropdownHeight: getDropdownHeight(dropdownHeight),
      openPosition: calcOpenPosition,
      gap,
      itemHeight,
      listHeight,
      listOffsetY,
      searchValue,
      success,
      warning,
      error: calcError,
      focusedOptionRef,
      searchInputRef,
      listContainerRef,
      selectorRef,
      ref,
      onSelectKeyDown,
      onSelectNavigation,
      onChangeOption: handleOptionClick,
      onSearchChange: setSearchValue,
      toggleDropdown,
      onRemoveOption: handleRemoveOption,
      removeAllOptions
    }),
    [
      selectedOptions,
      selectId,
      id,
      focusedIndex,
      visibleOptions,
      searchable,
      isOpen,
      calcIsLoading,
      disabled,
      required,
      multiple,
      maxSelectedItemsCount,
      dropdownHeight,
      calcOpenPosition,
      gap,
      itemHeight,
      listHeight,
      listOffsetY,
      searchValue,
      success,
      warning,
      calcError,
      onSelectKeyDown,
      onSelectNavigation,
      handleOptionClick,
      setSearchValue,
      toggleDropdown,
      handleRemoveOption,
      removeAllOptions
    ]
  );

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>;
};
