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
import { useFloating, autoUpdate, offset, flip, shift, size, useMergeRefs } from '@floating-ui/react';

import { cn } from '@shared/utils/cn';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import type { Option, SelectValue, SelectRef, SelectProps } from './types';
import { Icon } from '../icon';

export const Select = forwardRef(
  <T, Multiple extends boolean = false, Clearable extends boolean = true>(
    props: SelectProps<T, Multiple, Clearable>,
    ref: ForwardedRef<SelectRef<T, Multiple, Clearable>>
  ) => {
    const {
      className,
      placeholder = 'Select option',
      searchPlaceholder = 'Search option',
      ariaLabel,
      multiple = false,
      clearable = true,
      disabled = false,
      error: externalError,
      options = [],
      loadOptions,
      onChange
    } = props;

    const isControlled = 'value' in props;
    const propValue = isControlled ? props.value : undefined;
    const defaultValueProp = 'defaultValue' in props ? props.defaultValue : undefined;

    const listboxId = useId();

    const [internalValue, setInternalValue] = useState<SelectValue<T, Multiple, Clearable> | undefined>(
      defaultValueProp as SelectValue<T, Multiple, Clearable> | undefined
    );
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [fetchedOptions, setFetchedOptions] = useState<Option<T>[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const hasLoadedRef = useRef(false);

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
        return [] as SelectValue<T, true, Clearable>;
      }
      if (clearable) {
        return null as SelectValue<T, false, true>;
      }
      return allOptions[0] ?? null;
    }, [isControlled, propValue, allOptions, internalValue, multiple, clearable]);

    const hasValue = useMemo(() => {
      if (Array.isArray(currentValue)) {
        return currentValue.length > 0;
      }
      return !!currentValue;
    }, [currentValue]);

    const { refs, floatingStyles } = useFloating({
      open: isOpen,
      placement: 'bottom-start',
      middleware: [
        offset(4),
        flip({ fallbackPlacements: ['top-start'] }),
        shift({ padding: 8 }),
        size({
          apply({ rects, elements }) {
            elements.floating.style.width = `${rects.reference.width}px`;
          }
        })
      ],
      whileElementsMounted: autoUpdate
    });

    const mergedTriggerRef = useMergeRefs([triggerRef, refs.setReference]);
    const mergedFloatingRef = useMergeRefs([floatingRef, refs.setFloating]);

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

    const handleOptionSelect = useCallback(
      (option: Option<T>) => {
        if (option.disabled || disabled) {
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
      [multiple, currentValue, disabled, handleUpdate, handleClose]
    );

    const handleClear = useCallback(
      (e: ReactMouseEvent) => {
        e.stopPropagation();
        if (disabled) {
          return;
        }
        if (multiple) {
          handleUpdate([]);
        } else if (clearable) {
          handleUpdate(null);
        }
      },
      [disabled, multiple, clearable, handleUpdate]
    );

    const handleChipRemove = useCallback(
      (optionToRemove: Option<T>, e: ReactMouseEvent) => {
        e.stopPropagation();
        if (disabled) {
          return;
        }
        if (!multiple) {
          return;
        }
        const currentArr = Array.isArray(currentValue) ? currentValue : [];
        const newArr = currentArr.filter((item) => item.value !== optionToRemove.value);
        handleUpdate(newArr);
      },
      [disabled, multiple, currentValue, handleUpdate]
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

    useEffect(() => {
      const handleOutside = (e: MouseEvent) => {
        const target = e.target as Node | null;
        if (
          target &&
          !containerRef.current?.contains(target) &&
          !(floatingRef.current && floatingRef.current.contains(target))
        ) {
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
        return currentValue as SelectValue<T, Multiple, Clearable>;
      },
      open: handleOpen,
      close: handleClose
    }));

    const renderSelected = useCallback(() => {
      if (!hasValue) {
        return <span className="text-input-placeholder">{placeholder}</span>;
      }
      if (Array.isArray(currentValue)) {
        return (
          <div className="flex flex-wrap gap-1.5">
            {currentValue.map((option) => (
              <div
                key={option.value}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md border px-2 py-1 text-sm',
                  disabled
                    ? 'border-input-border-disabled bg-input-background-disabled text-input-text-disabled'
                    : 'border-input-chip-border bg-input-chip-bg text-input-chip-text'
                )}
              >
                {option.icon && <span className="text-base">{option.icon}</span>}
                <span>{option.label}</span>
                <button
                  className={cn('flex', !disabled ? 'cursor-pointer' : 'pointer-events-none')}
                  type="button"
                  onClick={(e) => handleChipRemove(option, e)}
                  aria-label={`Remove ${option.label}`}
                  disabled={disabled}
                >
                  <Icon type="cross" className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        );
      }
      return (
        <span className={cn('flex items-center gap-2', disabled && 'text-input-text-disabled')}>
          {currentValue?.icon && <span>{currentValue.icon}</span>}
          <span>{currentValue?.label}</span>
        </span>
      );
    }, [hasValue, currentValue, disabled, placeholder, handleChipRemove]);

    return (
      <div ref={containerRef} className={cn('relative w-full', className)}>
        <SelectTrigger
          ref={mergedTriggerRef}
          listboxId={listboxId}
          ariaLabel={ariaLabel || placeholder}
          isOpen={isOpen}
          disabled={disabled}
          hasValue={hasValue}
          clearable={clearable}
          multiple={multiple}
          error={combinedError}
          displayContent={renderSelected()}
          onClear={handleClear}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
        />
        <SelectContent
          ref={mergedFloatingRef}
          listboxId={listboxId}
          searchPlaceholder={searchPlaceholder}
          multiple={multiple}
          isOpen={isOpen}
          searchQuery={searchQuery}
          filteredOptions={filteredOptions}
          isLoading={isLoading}
          floatingStyle={floatingStyles}
          onClose={handleClose}
          onSearchChange={setSearchQuery}
          getIsSelected={getIsSelected}
          onOptionSelect={handleOptionSelect}
        />
      </div>
    );
  }
) as <T, Multiple extends boolean = false, Clearable extends boolean = true>(
  props: SelectProps<T, Multiple, Clearable> & RefAttributes<SelectRef>
) => ReactElement;
