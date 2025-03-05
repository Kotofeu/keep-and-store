'use client';
import { useState, useCallback, useMemo, useEffect, KeyboardEvent } from 'react';

import { useDebounce } from '@/shared/hooks';

import { Option, UseSelectLogicProps, UseSelectLogicReturn } from '../types';

export const useSelectLogic = <T>({
  options,
  multiple,
  value,
  isOpen,
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

  const filteredOptions = useMemo(
    () => loadedOptions.filter(option => option.label.toLowerCase().includes(debouncedSearchValue.toLowerCase())),
    [loadedOptions, debouncedSearchValue]
  );

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
    if (!isOpen && loadOptions && (!isOptionsWasLoaded || error)) {
      setIsLoading(true);
      setIsOptionsWasLoaded(true);
      loadOptions()
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
      if (disabled || !filteredOptions[index] || isLoading || error || filteredOptions[index].disabled) {
        return;
      }
      if (multiple) {
        const newSelectedOptions = selectedOptions.some(o => o.value === filteredOptions[index].value)
          ? selectedOptions.filter(o => o.value !== filteredOptions[index].value)
          : [...selectedOptions, filteredOptions[index]];
        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
      } else {
        setSelectedOptions([filteredOptions[index]]);
        onChange?.(filteredOptions[index]);
        setIsOpen(false);
      }
    },
    [multiple, onChange, selectedOptions, filteredOptions, setIsOpen, disabled, isLoading, error]
  );

  const handleRemoveOption = useCallback(
    (option: Option<T>) => {
      if (disabled || isLoading || error) {
        return;
      }
      const newSelectedOptions = selectedOptions.filter(o => o.value !== option.value);
      setSelectedOptions(newSelectedOptions);
      onChange?.(multiple ? newSelectedOptions : null);
    },
    [onChange, selectedOptions, disabled, multiple, isLoading, error]
  );

  const removeAllOptions = useCallback(() => {
    setSelectedOptions([]);
    onChange?.(null);
  }, [onChange]);

  const openSelectByEnter = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape' && !disabled && !isLoading) {
        setIsOpen(false);
      }
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
