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
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ForwardedRef,
  RefAttributes,
  ReactElement
} from 'react';
import { cn } from '@shared/utils/cn';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import type { Option, SelectValue, SelectRef, SelectProps } from './types';

const Select = forwardRef(
  <T, Multiple extends boolean = false, Clearable extends boolean = true>(
    props: SelectProps<T, Multiple, Clearable>,
    ref: ForwardedRef<SelectRef<T, Multiple, Clearable>>
  ) => {
    const {
      options = [],
      loadOptions,
      onChange,
      multiple = false,
      clearable = true,
      placeholder = 'Select option',
      searchPlaceholder = 'Search option',
      disabled = false,
      className,
      error: externalError
    } = props;

    const isControlled = 'value' in props;
    const propValue = isControlled ? props.value : undefined;
    const defaultValueProp = 'defaultValue' in props ? props.defaultValue : undefined;

    const [internalValue, setInternalValue] = useState<SelectValue<T, Multiple, Clearable> | undefined>(
      defaultValueProp as SelectValue<T, Multiple, Clearable> | undefined
    );

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchedOptions, setFetchedOptions] = useState<Option<T>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const combinedError = loadError || externalError;

    const allOptions = useMemo(() => (loadOptions ? fetchedOptions : options), [loadOptions, fetchedOptions, options]);

    const currentValue = useMemo(() => {
      if (isControlled && propValue !== undefined) {
        return propValue;
      }
      if (internalValue !== undefined) {
        return internalValue;
      }
      if (multiple) {
        const emptyValue: SelectValue<T, true, Clearable> = [];
        return emptyValue;
      }
      if (clearable) {
        const emptyValue: SelectValue<T, false, true> = null;
        return emptyValue;
      }
      return allOptions[0] ?? null;
    }, [isControlled, propValue, allOptions, internalValue, multiple, clearable]);

    const containerRef = useRef<HTMLDivElement>(null);
    const listboxId = useId();
    const triggerRef = useRef<HTMLDivElement>(null);
    const hasLoadedRef = useRef(false);

    const filteredOptions = useMemo(() => {
      if (!searchQuery.trim()) {
        return allOptions;
      }

      const term = searchQuery.toLowerCase().trim();
      return allOptions.filter(
        (option) => option.label.toLowerCase().includes(term) || option.value.toLowerCase().includes(term)
      );
    }, [allOptions, searchQuery]);

    const getIsSelected = useCallback(
      (option: Option<T>) => {
        if (Array.isArray(currentValue)) {
          return currentValue.some((item) => item.value === option.value);
        }
        return !!currentValue && currentValue.value === option.value;
      },
      [currentValue]
    );

    const hasValue = useMemo(() => {
      if (Array.isArray(currentValue)) {
        return currentValue.length > 0;
      }
      return !!currentValue;
    }, [currentValue]);

    const handleOpen = useCallback(async () => {
      if (disabled) {
        return;
      }

      setIsOpen(true);
      setSearchQuery('');

      if (loadOptions && (!hasLoadedRef.current || loadError)) {
        hasLoadedRef.current = true;
        setIsLoading(true);
        setLoadError(null);
        try {
          const loaded = await loadOptions();
          setFetchedOptions(loaded);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Failed to load options';
          setLoadError(msg);
          setFetchedOptions([]);
        } finally {
          setIsLoading(false);
        }
      }
    }, [disabled, loadError, loadOptions]);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setSearchQuery('');
      triggerRef.current?.focus();
    }, []);

    useEffect(() => {
      const handleOutside = (e: MouseEvent) => {
        if (containerRef.current && e.target instanceof Node && !containerRef.current.contains(e.target)) {
          handleClose();
        }
      };

      if (isOpen) {
        document.addEventListener('mousedown', handleOutside);
      }
      return () => document.removeEventListener('mousedown', handleOutside);
    }, [isOpen, handleClose]);

    useImperativeHandle(ref, () => ({
      get value() {
        return (currentValue ? currentValue : null) as SelectValue<T, Multiple, Clearable>;
      },
      open: handleOpen,
      close: handleClose
    }));

    const updateValue = useCallback(
      (newValue: SelectValue<T, Multiple, Clearable>) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const handleUpdate = useCallback(
      (newValue: Option<T> | Option<T>[] | null) => {
        updateValue(newValue as SelectValue<T, Multiple, Clearable>);
      },
      [updateValue]
    );

    const handleOptionSelect = useCallback(
      (option: Option<T>) => {
        if (option.disabled) {
          return;
        }

        if (multiple) {
          const currentArr = Array.isArray(currentValue) ? currentValue : [];
          const exists = currentArr.some((item) => item.value === option.value);
          const newArr = exists ? currentArr.filter((item) => item.value !== option.value) : [...currentArr, option];
          handleUpdate(newArr);
        } else {
          handleUpdate(option);
        }

        setSearchQuery('');
        if (!multiple) {
          handleClose();
        }
      },
      [multiple, currentValue, handleUpdate, handleClose]
    );

    const handleClear = useCallback(
      (e: ReactMouseEvent) => {
        e.stopPropagation();
        if (multiple) {
          handleUpdate([]);
        } else if (clearable) {
          handleUpdate(null);
        }
      },
      [multiple, clearable, handleUpdate]
    );

    const handleChipRemove = useCallback(
      (optionToRemove: Option<T>, e: ReactMouseEvent) => {
        e.stopPropagation();
        if (!multiple) {
          return;
        }

        const currentArr = Array.isArray(currentValue) ? currentValue : [];
        const newArr = currentArr.filter((item) => item.value !== optionToRemove.value);
        handleUpdate(newArr);
      },
      [multiple, currentValue, handleUpdate]
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
      if (!hasValue) {
        return <span className="text-input-placeholder">{placeholder}</span>;
      }

      if (Array.isArray(currentValue)) {
        return (
          <div className="flex flex-wrap gap-1">
            {currentValue.map((option) => (
              <div
                key={option.value}
                className="border-button-secondary-border bg-button-secondary-hover-bg text-button-secondary-text inline-flex items-center gap-1 rounded border py-0.5 pr-1 pl-2 text-sm"
              >
                {option.icon && <span className="text-xs">{option.icon}</span>}
                <span>{option.label}</span>
                <button
                  type="button"
                  onClick={(e) => handleChipRemove(option, e)}
                  className="hover:bg-button-secondary-disabled-bg text-button-secondary-text ml-1 rounded-full p-0.5 text-lg leading-none"
                  aria-label={`Remove ${option.label}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        );
      }

      return (
        <span className="flex items-center gap-2">
          {currentValue?.icon && <span>{currentValue.icon}</span>}
          <span>{currentValue?.label}</span>
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
          multiple={multiple}
          error={combinedError}
          onClear={handleClear}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          listboxId={listboxId}
          ref={triggerRef}
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
  props: SelectProps<T, Multiple, Clearable> & RefAttributes<SelectRef>
) => ReactElement;

export { Select };
