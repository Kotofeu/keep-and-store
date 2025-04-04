'use client';
import { useState, useCallback, useMemo, useEffect, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';

import { useDebounce } from '@/shared/hooks';

import { Option, SelectOpenPosition, UseSelectLogicProps, UseSelectLogicReturn } from '../types';

const MIN_OFFSET_TO_SELECT = 10;

export const useSelectLogic = <T>({
  maxSelectedItemsCount,
  isOpen,
  disabled,
  multiple,
  excludeSelected,
  searchable,
  value,
  options,
  openPosition,
  dropdownHeight,
  focusedOptionRef,
  searchInputRef,
  selectorRef,
  setIsOpen,
  onChange,
  loadOptions
}: UseSelectLogicProps<T>): UseSelectLogicReturn<T> => {
  // Translations
  const t = useTranslations('Shared.Select');

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);
  const [loadedOptions, setLoadedOptions] = useState<Option<T>[]>(options);
  const [isOptionsWasLoaded, setIsOptionsWasLoaded] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option<T>[]>(
    value ? (Array.isArray(value) ? value : [value]) : []
  );
  const [searchValue, setSearchValue] = useState('');
  const [calcOpenPosition, setCalcOpenPosition] = useState<SelectOpenPosition>(openPosition);
  // Focused management
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [isOpen]);

  // Debounced values
  const debouncedSearchValue = useDebounce(searchValue, 300);

  // Filtered options calculation
  const filteredOptions = useMemo(() => {
    const filtered = loadedOptions.filter(option =>
      option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
    if (excludeSelected) {
      return filtered.filter(option => !selectedOptions.some(selected => selected.value === option.value));
    }
    return filtered;
  }, [loadedOptions, debouncedSearchValue, selectedOptions, excludeSelected]);

  // Dropdown toggle handler
  const toggleDropdown = useCallback(() => {
    if (!disabled && !isLoading) {
      setIsOpen(prev => !prev);
    }
  }, [setIsOpen, disabled, isLoading]);

  // Options loading effect
  useEffect(() => {
    if (!isOpen && loadOptions && !isOptionsWasLoaded) {
      setIsLoading(true);
      setIsOptionsWasLoaded(true);
      Promise.resolve(loadOptions())
        .then(newOptions => {
          setLoadedOptions(newOptions as Option<T>[]);
        })
        .catch(error => {
          setLoadingError(t('loadingError', { digest: error.digest }));
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [loadingError, isOpen, isOptionsWasLoaded, loadOptions, t]);

  // Option selection handlers
  const handleOptionClick = useCallback(
    (index: number) => {
      const option = filteredOptions[index];
      if (disabled || !option || isLoading || option.disabled) {
        return;
      }

      if (multiple) {
        const isSelected = selectedOptions.some(o => o.value === option.value);
        let newSelectedOptions: Option[];

        if (isSelected) {
          newSelectedOptions = selectedOptions.filter(o => o.value !== option.value);
        } else {
          const canAddNew = !maxSelectedItemsCount || selectedOptions.length < maxSelectedItemsCount;
          newSelectedOptions = canAddNew ? [...selectedOptions, option] : selectedOptions;
        }

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
      } else {
        setSelectedOptions([option]);
        onChange?.(option);
        setIsOpen(false);
      }
    },
    [disabled, isLoading, multiple, selectedOptions, maxSelectedItemsCount, onChange, filteredOptions, setIsOpen]
  );

  const handleRemoveOption = useCallback(
    (option: Option<T>) => {
      if (!disabled && !isLoading) {
        const newSelectedOptions = selectedOptions.filter(o => o.value !== option.value);
        setSelectedOptions(newSelectedOptions);
        onChange?.(multiple ? newSelectedOptions : null);
      }
    },
    [onChange, selectedOptions, disabled, multiple, isLoading]
  );

  const removeAllOptions = useCallback(() => {
    setSelectedOptions([]);
    onChange?.(null);
  }, [onChange]);

  // Keyboard navigation handler
  const onSelectKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (!disabled && !isLoading) {
        if (e.key === 'Enter' && focusedIndex === -1) {
          toggleDropdown();
        }
      }
    },
    [disabled, isLoading, focusedIndex, toggleDropdown]
  );

  const itemsListNavigation = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled || isLoading || !isOpen) {
        return;
      }
      if (e.key === 'Escape') {
        selectorRef && selectorRef.current?.focus();
        toggleDropdown();
        return;
      }
      if (isOpen) {
        const isNavigationKey = ['Tab', 'ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(
          e.key
        );
        if (isNavigationKey) {
          e.preventDefault();
          if (searchable && searchInputRef?.current) {
            searchInputRef.current.focus();
          }
        }
        const lastIndex = filteredOptions.length - 1;

        switch (e.key) {
          case 'Tab':
            setFocusedIndex(
              e.shiftKey
                ? focusedIndex > 0
                  ? focusedIndex - 1
                  : lastIndex
                : focusedIndex < lastIndex
                  ? focusedIndex + 1
                  : 0
            );
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            setFocusedIndex(focusedIndex < lastIndex ? focusedIndex + 1 : 0);
            break;

          case 'ArrowUp':
          case 'ArrowLeft':
            setFocusedIndex(focusedIndex > 0 ? focusedIndex - 1 : lastIndex);
            break;

          case 'Home':
            setFocusedIndex(0);
            break;

          case 'End':
            setFocusedIndex(lastIndex);
            break;

          case 'Enter':
            focusedOptionRef.current?.click();
            break;
        }
      }
    },
    [
      disabled,
      isLoading,
      isOpen,
      toggleDropdown,
      filteredOptions,
      focusedIndex,
      focusedOptionRef,
      searchable,
      searchInputRef,
      selectorRef
    ]
  );

  // Calculate dropdown position
  useEffect(() => {
    const handler = () => {
      if (selectorRef && selectorRef.current && isOpen && openPosition === 'auto') {
        const viewportHeight = document.documentElement.clientHeight;
        const selectorRect = selectorRef.current.getBoundingClientRect();
        const placeBelow = viewportHeight - selectorRect.top >= dropdownHeight + MIN_OFFSET_TO_SELECT;
        const placeAbove = selectorRect.top >= dropdownHeight + MIN_OFFSET_TO_SELECT;
        setCalcOpenPosition(!placeBelow && placeAbove ? 'top' : 'bottom');
      }
    };

    handler();
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [dropdownHeight, isOpen, openPosition, selectorRef]);

  // Return all necessary values and handlers
  return {
    searchValue,
    loadingError,
    focusedIndex,
    isLoading,
    filteredOptions,
    selectedOptions,
    openPosition: calcOpenPosition,
    setSearchValue,
    removeAllOptions,
    toggleDropdown,
    handleOptionClick,
    handleRemoveOption,
    onSelectKeyDown,
    itemsListNavigation
  };
};
