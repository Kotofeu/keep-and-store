'use client';
import { useState, useCallback, useMemo, useEffect, Dispatch, SetStateAction } from 'react';

import { Option } from '@/shared/types';

export const useSelectLogic = (
  options: Option[],
  multiple: boolean,
  value: Option | Option[] | undefined,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  disabled?: boolean,
  onChange?: (option: Option | Option[]) => void
): [
  Option[],
  string,
  number,
  Option[],
  Dispatch<SetStateAction<string>>,
  Dispatch<SetStateAction<number>>,
  (index: number) => void,
  (option: Option) => void,
  () => void
] => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>(
    value ? (Array.isArray(value) ? value : [value]) : []
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const filteredOptions = useMemo(
    () => options.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [options, searchTerm]
  );

  useEffect(() => {
    setFocusedIndex(-1);
  }, [isOpen]);

  const handleOptionClick = useCallback(
    (index: number) => {
      if (disabled) {
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
    [multiple, onChange, selectedOptions, filteredOptions, setIsOpen, disabled]
  );

  const handleRemoveOption = useCallback(
    (option: Option) => {
      if (disabled) {
        return;
      }
      const newSelectedOptions = selectedOptions.filter(o => o.value !== option.value);
      setSelectedOptions(newSelectedOptions);
      onChange?.(newSelectedOptions);
    },
    [onChange, selectedOptions, disabled]
  );

  const toggleDropdown = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  }, [setIsOpen, disabled]);

  return [
    selectedOptions,
    searchTerm,
    focusedIndex,
    filteredOptions,
    setSearchTerm,
    setFocusedIndex,
    handleOptionClick,
    handleRemoveOption,
    toggleDropdown
  ];
};
