'use client';

import {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useId,
  useImperativeHandle,
  KeyboardEvent
} from 'react';
import { cn } from '@shared/utils/cn';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import { Option, SelectValue, SelectRef, SelectProps } from './types';

const Select = forwardRef(
  <T, Multiple extends boolean = false, Clearable extends boolean = true>(
    props: SelectProps<T, Multiple, Clearable>,
    ref: React.ForwardedRef<SelectRef>
  ) => {
    const {
      options = [],
      loadOptions,
      value,
      defaultValue: defaultValueProp,
      onChange,
      multiple = false as Multiple,
      clearable = true as Clearable,
      placeholder = 'Select...',
      searchPlaceholder = 'Search...',
      disabled = false,
      className
    } = props;

    const [internalValue, setInternalValue] = useState<SelectValue<T, Multiple, Clearable>>(() => {
      if (defaultValueProp !== undefined) {
        return defaultValueProp;
      }

      if (multiple) {
        return (clearable ? null : []) as SelectValue<T, Multiple, Clearable>;
      }
      return (clearable ? null : null) as SelectValue<T, Multiple, Clearable>;
    });

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchedOptions, setFetchedOptions] = useState<Option<T>[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();

    const hasLoadedRef = useRef(false);
    const valueRef = useRef(currentValue);

    const allOptions = loadOptions ? fetchedOptions : options;

    const filteredOptions = useMemo(() => {
      if (!searchQuery.trim()) {
        return allOptions;
      }

      const term = searchQuery.toLowerCase().trim();
      return allOptions.filter((o) => o.label.toLowerCase().includes(term) || o.value.toLowerCase().includes(term));
    }, [allOptions, searchQuery]);

    const getIsSelected = useCallback(
      (option: Option<T>) => {
        if (!currentValue) {
          return false;
        }

        if (multiple) {
          return (currentValue as Option<T>[]).some((o) => o.value === option.value);
        }
        return (currentValue as Option<T>).value === option.value;
      },
      [currentValue, multiple]
    );

    const hasValue = useMemo(() => {
      if (!currentValue) {
        return false;
      }
      return multiple ? (currentValue as Option<T>[]).length > 0 : true;
    }, [currentValue, multiple]);

    const handleOpen = useCallback(async () => {
      if (disabled) {
        return;
      }

      setIsOpen(true);
      setSearchQuery('');

      if (loadOptions && !hasLoadedRef.current) {
        hasLoadedRef.current = true;
        setIsLoading(true);
        try {
          const loaded = await loadOptions();
          setFetchedOptions(loaded);
        } catch (err) {
          // TODO handle the error
          console.error('Select loadOptions error:', err);
          setFetchedOptions([]);
        } finally {
          setIsLoading(false);
        }
      }
    }, [disabled, loadOptions]);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setSearchQuery('');
    }, []);

    useEffect(() => {
      const handleOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleOutside);
      }
      return () => document.removeEventListener('mousedown', handleOutside);
    }, [isOpen, handleClose]);

    useEffect(() => {
      valueRef.current = currentValue;
    }, [currentValue]);

    useImperativeHandle(
      ref,
      () => ({
        get value() {
          return JSON.stringify(valueRef.current ?? null);
        }
      }),
      []
    );

    const updateValue = useCallback(
      (newValue: SelectValue<T, Multiple, Clearable>) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const handleOptionSelect = useCallback(
      (option: Option<T>) => {
        let newValue: SelectValue<T, Multiple, Clearable>;

        if (multiple) {
          const currentArr = Array.isArray(currentValue) ? currentValue : currentValue ? [currentValue] : [];

          const exists = currentArr.some((o) => o.value === option.value);
          newValue = (
            exists ? currentArr.filter((o) => o.value !== option.value) : [...currentArr, option]
          ) as SelectValue<T, Multiple, Clearable>;
        } else {
          newValue = option as SelectValue<T, Multiple, Clearable>;
        }

        updateValue(newValue);
        setSearchQuery('');

        if (!multiple) {
          handleClose();
        }
      },
      [multiple, currentValue, updateValue, handleClose]
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        const emptyValue = multiple ? [] : null;
        updateValue(emptyValue as SelectValue<T, Multiple, Clearable>);
      },
      [multiple, updateValue]
    );

    const handleChipRemove = useCallback(
      (optionToRemove: Option<T>, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!multiple) {
          return;
        }

        const currentArr = Array.isArray(currentValue) ? currentValue : [];

        updateValue(currentArr.filter((o) => o.value !== optionToRemove.value) as SelectValue<T, Multiple, Clearable>);
      },
      [multiple, currentValue, updateValue]
    );

    const handleTriggerClick = useCallback(() => {
      if (disabled) {
        return;
      }
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }, [disabled, isOpen, handleClose, handleOpen]);

    const handleTriggerKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (disabled) {
          return;
        }

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (isOpen) {
            handleClose();
          } else {
            handleOpen();
          }
        }
        if (e.key === 'ArrowDown' && !isOpen) {
          e.preventDefault();
          handleOpen();
        }
      },
      [disabled, isOpen, handleClose, handleOpen]
    );

    const renderSelected = () => {
      if (!currentValue) {
        return <span className="text-input-placeholder">{placeholder}</span>;
      }

      if (multiple) {
        const selectedArr = Array.isArray(currentValue) ? (currentValue as Option<T>[]) : [];

        return (
          <div className="flex flex-wrap gap-1">
            {selectedArr.map((opt) => (
              <div
                key={opt.value}
                className="border-button-secondary-border bg-button-secondary-hover-bg text-button-secondary-text inline-flex items-center gap-1 rounded border py-0.5 pr-1 pl-2 text-sm"
              >
                {opt.icon && <span className="text-xs">{opt.icon}</span>}
                <span>{opt.label}</span>
                <button
                  type="button"
                  onClick={(e) => handleChipRemove(opt, e)}
                  className="hover:bg-button-secondary-disabled-bg text-button-secondary-text ml-1 rounded-full p-0.5 text-lg leading-none"
                  aria-label={`Remove ${opt.label}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      }

      const opt = currentValue as Option<T>;
      return (
        <span className="flex items-center gap-2">
          {opt.icon}
          {opt.label}
        </span>
      );
    };

    return (
      <div ref={containerRef} className={cn('relative w-full', className)}>
        <SelectTrigger
          isOpen={isOpen}
          isDisabled={disabled}
          hasValue={hasValue}
          displayContent={renderSelected()}
          clearable={clearable}
          onClear={handleClear}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          listboxId={listboxId}
        />

        <SelectContent
          isOpen={isOpen}
          onClose={handleClose}
          filteredOptions={filteredOptions}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          multiple={multiple}
          getIsSelected={getIsSelected}
          onOptionSelect={handleOptionSelect}
          isLoading={isLoading}
          searchPlaceholder={searchPlaceholder}
          listboxId={listboxId}
        />
      </div>
    );
  }
) as <T, Multiple extends boolean = false, Clearable extends boolean = true>(
  props: SelectProps<T, Multiple, Clearable> & React.RefAttributes<SelectRef>
) => React.ReactElement;

export { Select };
