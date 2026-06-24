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
  ForwardedRef
} from 'react';
import { useFloating, autoUpdate, offset, flip, shift, size, useMergeRefs } from '@floating-ui/react';
import { useTranslations } from 'next-intl';
import { useClickOutside } from '@shared/hooks/useClickOutside';
import { cn } from '@shared/utils/cn';
import { SelectContent } from './select-content';
import { SelectTrigger } from './select-trigger';
import type { Option, SelectRef, SelectProps, SelectValue, SelectComponent } from './types';
import { Icon } from '../icon';

export const Select = forwardRef(<T,>(props: SelectProps<T>, ref: ForwardedRef<SelectRef<T>>) => {
  const t = useTranslations('shared.select');

  const {
    className,
    placeholder = t('placeholder'),
    searchPlaceholder = t('searchPlaceholder'),
    loadingText = t('loadingText'),
    noResultsText = t('noResultsText'),
    clearAriaLabel = t('clearAriaLabel'),
    removeAriaLabel = t('removeAriaLabel'),
    loadErrorMessage = t('loadErrorMessage'),
    title,
    ariaLabel,
    disabled = false,
    searchable = true,
    error: externalError,
    isLoading: externalIsLoading,
    isInstantLoad,
    options = [],
    loadOptions,
    ...otherProps
  } = props;

  const {
    multiple: _multiple,
    clearable: _clearable,
    value: _value,
    onChange: _onChange,
    defaultValue: _defaultValue,
    ...wrapperProps
  } = otherProps;

  const getInitialValue = (): SelectValue<T> => {
    if ('value' in props) {
      return props.value;
    }
    if ('defaultValue' in props) {
      return props.defaultValue;
    }
    return props.multiple ? [] : undefined;
  };

  const [internalValue, setInternalValue] = useState<SelectValue<T>>(getInitialValue);

  const hasValue = useMemo(
    () => (props.multiple ? !!(Array.isArray(internalValue) && internalValue.length) : !!internalValue),
    [internalValue, props.multiple]
  );

  const listboxId = useId();

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
  const combinedIsLoading = isLoading || !!externalIsLoading;
  const allOptions = useMemo(() => (loadOptions ? fetchedOptions : options), [loadOptions, fetchedOptions, options]);

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

  useEffect(() => {
    if ('value' in props) {
      setInternalValue(props.value);
    }
  }, [props]);

  const handleLoadFullOptions = useCallback(async () => {
    if (loadOptions) {
      setIsLoading(true);
      setLoadError(null);
      try {
        const loaded = await loadOptions();
        setFetchedOptions(loaded);
        hasLoadedRef.current = true;
      } catch (err) {
        if (loadErrorMessage) {
          setLoadError(loadErrorMessage);
        }
        const msg = err instanceof Error ? err.message : `${err}`;
        setLoadError(msg);
        setFetchedOptions([]);
      } finally {
        setIsLoading(false);
      }
    }
  }, [loadErrorMessage, loadOptions]);

  useEffect(() => {
    if (isInstantLoad && !hasLoadedRef.current) {
      handleLoadFullOptions();
    }
  }, [isInstantLoad, handleLoadFullOptions]);

  const getIsSelected = useCallback(
    (option: Option<T>) => {
      if (Array.isArray(internalValue)) {
        return internalValue.some((item) => item.value === option.value);
      }
      return !!internalValue && internalValue.value === option.value;
    },
    [internalValue]
  );

  const handleOptionSelect = useCallback(
    (option: Option<T>, e?: ReactMouseEvent) => {
      e?.stopPropagation();

      if (disabled || option.disabled) {
        return;
      }

      if (!props.multiple) {
        props.onChange?.(option);
        setInternalValue(option);
        setIsOpen(false);
        setSearchQuery('');
      } else if (props.multiple) {
        const innerArray = Array.isArray(internalValue) ? internalValue : [];
        const isSelected = innerArray.some((v) => v.value === option.value);
        const newValues = isSelected ? innerArray.filter((v) => v.value !== option.value) : [...innerArray, option];
        props.onChange?.(newValues);
        setInternalValue(newValues);
      }
    },
    [disabled, props, internalValue]
  );

  const handleOpen = useCallback(async () => {
    if (disabled) {
      return;
    }

    setIsOpen(true);
    setSearchQuery('');

    if (!hasLoadedRef.current || loadError) {
      handleLoadFullOptions();
    }
  }, [disabled, loadError, handleLoadFullOptions]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
    if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, []);

  const handleClear = useCallback(
    (e: ReactMouseEvent) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      if (props.clearable) {
        props.onChange?.(null);
        setInternalValue(null);
      } else if (props.multiple) {
        props.onChange?.([]);
        setInternalValue([]);
      }
      setSearchQuery('');
    },
    [disabled, props]
  );

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

  const handleContainerTabDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (isOpen && e.key === 'Tab') {
        handleClose();
      }
    },
    [isOpen, handleClose]
  );

  useClickOutside([containerRef, floatingRef], handleClose, isOpen);

  useImperativeHandle(ref, () => ({
    get element() {
      return containerRef.current;
    },
    get value() {
      return internalValue;
    },
    open: handleOpen,
    close: handleClose
  }));

  const renderSelected = useCallback(() => {
    if (!hasValue) {
      return <span className="text-input-placeholder">{placeholder}</span>;
    }
    if (Array.isArray(internalValue)) {
      return (
        <div className="flex flex-wrap gap-1.5">
          {internalValue.map((option) => (
            <div
              key={option.value}
              className={cn(
                'flex items-center gap-2 rounded-md border px-2 py-1 text-sm',
                disabled
                  ? 'border-input-chip-border-disabled bg-input-chip-bg-disabled text-input-chip-text-disabled'
                  : 'border-input-chip-border bg-input-chip-bg text-input-chip-text'
              )}
            >
              {option.icon && <Icon type={option.icon} />}
              <span>{option.label}</span>
              <button
                className={cn('flex', !disabled ? 'cursor-pointer' : 'pointer-events-none')}
                type="button"
                onClick={(e) => handleOptionSelect(option, e)}
                onKeyDown={(e) => e.stopPropagation()}
                aria-label={`${removeAriaLabel} ${option.label}`}
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
        {internalValue?.icon && <Icon type={internalValue.icon} />}
        <span>{internalValue?.label}</span>
      </span>
    );
  }, [hasValue, internalValue, disabled, placeholder, removeAriaLabel, handleOptionSelect]);

  return (
    <div ref={containerRef} className={cn('relative w-full', className)} onKeyDown={handleContainerTabDown}>
      <SelectTrigger
        ref={mergedTriggerRef}
        listboxId={listboxId}
        ariaLabel={ariaLabel || title || placeholder}
        title={title}
        clearAriaLabel={clearAriaLabel}
        isOpen={isOpen}
        disabled={disabled}
        hasValue={hasValue}
        clearable={props.clearable}
        multiple={props.multiple}
        error={combinedError}
        isLoading={combinedIsLoading}
        floatingRef={floatingRef}
        displayContent={renderSelected()}
        handleClear={handleClear}
        handleClose={handleClose}
        handleOpen={handleOpen}
        handleTriggerKeyDown={handleTriggerKeyDown}
        {...wrapperProps}
      />
      <SelectContent
        ref={mergedFloatingRef}
        listboxId={listboxId}
        searchPlaceholder={searchPlaceholder}
        loadingText={loadingText}
        noResultsText={noResultsText}
        searchQuery={searchQuery}
        multiple={props.multiple}
        searchable={searchable}
        isOpen={isOpen}
        error={combinedError}
        options={allOptions}
        isLoading={combinedIsLoading}
        floatingStyle={floatingStyles}
        onClose={handleClose}
        setSearchQuery={setSearchQuery}
        getIsSelected={getIsSelected}
        handleOptionSelect={handleOptionSelect}
      />
    </div>
  );
}) as SelectComponent;

Select.displayName = 'Select';
