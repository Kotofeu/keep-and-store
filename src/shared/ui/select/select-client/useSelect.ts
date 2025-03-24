'use client';
import { useState, useCallback, useMemo, useEffect, KeyboardEvent } from 'react';

import { useDebounce } from '@/shared/hooks';

import { Option, UseSelectLogicProps, UseSelectLogicReturn } from '../types';

export const useSelectLogic = <T>({
  options,
  multiple,
  value,
  isOpen,
  excludeSelected,
  maxSelectedItemsCount,
  focusedOptionRef,
  disabled,
  setIsOpen,
  onChange,
  loadOptions
}: UseSelectLogicProps<T>): UseSelectLogicReturn<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedOptions, setLoadedOptions] = useState<Option<T>[]>(options);
  const [isOptionsWasLoaded, setIsOptionsWasLoaded] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<Option<T>[]>(
    value ? (Array.isArray(value) ? value : [value]) : []
  );

  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const filteredOptions = useMemo(() => {
    const filtered = loadedOptions.filter(option =>
      option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
    if (excludeSelected) {
      return filtered.filter(option => !selectedOptions.some(selected => selected.value === option.value));
    }

    return filtered;
  }, [loadedOptions, debouncedSearchValue, selectedOptions, excludeSelected]);
  useEffect(() => {
    setFocusedIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    if (focusedIndex !== undefined && focusedOptionRef.current) {
      focusedOptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [focusedIndex, focusedOptionRef]);

  useEffect(() => {
    if (!isOpen && loadOptions && !isOptionsWasLoaded) {
      setIsLoading(true);
      setIsOptionsWasLoaded(true);
      Promise.resolve(loadOptions())
        .then(newOptions => {
          setLoadedOptions(newOptions as Option<T>[]);
        })
        .catch(error => {
          const errorMessage = (error as Error).message || 'Loading options error';
          setError(errorMessage);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [error, isOpen, isOptionsWasLoaded, loadOptions]);

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

  const openSelectByEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && !disabled && !isLoading) {
        setIsOpen(true);
      }
    },
    [setIsOpen, disabled, isLoading]
  );

  const toggleDropdown = useCallback(() => {
    if (!disabled && !isLoading) {
      setIsOpen(prev => !prev);
    }
  }, [setIsOpen, disabled, isLoading]);

  return {
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
    isLoading,
    error
  };
};
