'use client';
import { useState, useCallback, useMemo, useEffect, KeyboardEvent } from 'react';
import { useTranslations } from 'next-intl';

import { useDebounce } from '@/shared/hooks';

import { Option, UseSelectLogicProps, UseSelectLogicReturn } from '../types';

export const useSelectLogic = <T>({
  maxSelectedItemsCount,
  isOpen,
  disabled,
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

  // Focused management
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (focusedIndex && focusedOptionRef.current) {
      focusedOptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
      focusedOptionRef.current.focus();
    }
  }, [focusedIndex, focusedOptionRef]);
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
        if (e.key === 'Enter') {
          toggleDropdown();
        }
        if (e.key === 'Tab' && isOpen) {
          if (searchable && searchInputRef && searchInputRef.current) {
            e.preventDefault();
            searchInputRef.current.focus();
          }
        }
      }
    },
    [disabled, isLoading, isOpen, toggleDropdown, searchInputRef, searchable]
  );

  // Keyboard navigation handler
  const itemsListNavigation = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (disabled || isLoading || !isOpen) {
        return;
      }

      e.preventDefault();

      if (e.key === 'Escape') {
        toggleDropdown();
      } else if (isOpen) {
        switch (e.key) {
          case 'Tab':
            if (e.shiftKey) {
              const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : filteredOptions.length - 1;
              setFocusedIndex(prevIndex);
            } else {
              const nextIndex = focusedIndex < filteredOptions.length - 1 ? focusedIndex + 1 : 0;
              setFocusedIndex(nextIndex);
            }
            break;
          case 'ArrowDown':
          case 'ArrowRight':
            const nextIndex = focusedIndex < filteredOptions.length - 1 ? focusedIndex + 1 : 0;
            setFocusedIndex(nextIndex);
            break;
          case 'ArrowUp':
          case 'ArrowLeft':
            const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : filteredOptions.length - 1;
            setFocusedIndex(prevIndex);
            break;
          case 'Home':
            setFocusedIndex(0);
            break;
          case 'End':
            setFocusedIndex(filteredOptions.length - 1);
            break;
        }
      }
    },
    [disabled, isLoading, isOpen, toggleDropdown, filteredOptions, focusedIndex]
  );

  // Return all necessary values and handlers
  return {
    searchValue,
    loadingError,
    focusedIndex,
    isLoading,
    filteredOptions,
    selectedOptions,
    setSearchValue,
    removeAllOptions,
    toggleDropdown,
    handleOptionClick,
    handleRemoveOption,
    onSelectKeyDown,
    itemsListNavigation
  };
};
