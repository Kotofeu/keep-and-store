'use client';
import { memo, RefObject, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { Option } from '../../select';
import { Tooltip } from '../../tooltip';
import { Icon } from '../../icon';

interface SelectValueProps<T> {
  placeholder?: string;
  selectedOptions: Option<T>[];
  selectId: string;
  multiple: boolean;
  disabled: boolean;
  isLoading: boolean;
  required: boolean;
  maxSelectedItemsCount: number;
  selectorRef: RefObject<HTMLDivElement | null>;
  onRemoveOption: (option: Option<T>) => void;
  removeAllOptions: () => void;
}

export const SelectValue = memo(
  <T,>({
    placeholder,
    selectedOptions,
    selectId,
    multiple,
    required,
    disabled,
    isLoading,
    maxSelectedItemsCount,
    selectorRef,
    onRemoveOption,
    removeAllOptions
  }: SelectValueProps<T>) => {
    const t = useTranslations('Shared.Select');
    const hasSelectedOptions = selectedOptions.length > 0;
    const isInteractive = !disabled && !isLoading;
    const iconColor = isInteractive ? 'var(--icon-secondary)' : 'var(--icon-secondary-disabled)';

    const handleRemoveOption = useCallback(
      (option: Option, e: React.MouseEvent | React.KeyboardEvent) => {
        if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
          return;
        }
        e.stopPropagation();
        onRemoveOption(option);
        e.type === 'keydown' && selectorRef && selectorRef.current?.focus();
      },
      [onRemoveOption, selectorRef]
    );

    const handleRemoveAll = useCallback(
      (e: React.MouseEvent | React.KeyboardEvent) => {
        if (e.type === 'keydown' && (e as React.KeyboardEvent).key !== 'Enter') {
          return;
        }
        e.stopPropagation();
        removeAllOptions();
        e.type === 'keydown' && selectorRef && selectorRef.current?.focus();
      },
      [removeAllOptions, selectorRef]
    );

    return (
      <div className={styles.value}>
        <div className={styles.value__options}>
          {maxSelectedItemsCount && multiple && hasSelectedOptions && (
            <div className={styles.value__counter}>
              <span>{selectedOptions.length}</span>
              <span>/</span>
              <span>{maxSelectedItemsCount}</span>
            </div>
          )}

          {hasSelectedOptions
            ? selectedOptions.map(option => (
                <span
                  key={option.value}
                  className={classNames(styles.value__selected, {
                    [styles.value__selected_multiple]: multiple
                  })}
                >
                  {option.ui || option.label}
                  {multiple && (
                    <Tooltip
                      className={styles.tooltip}
                      content={t('removeOption', { optionLabel: option.label })}
                      backgroundColor='var(--icon-secondary)'
                    >
                      <button
                        type='button'
                        className={styles.value__remove}
                        onClick={e => handleRemoveOption(option, e)}
                        onKeyDown={e => handleRemoveOption(option, e)}
                        data-ignore-element={selectId}
                        aria-label={t('removeOption', { optionLabel: option.label })}
                      >
                        <Icon type='cross' color={iconColor} aria-hidden />
                      </button>
                    </Tooltip>
                  )}
                </span>
              ))
            : placeholder}
        </div>
        {!required && hasSelectedOptions && isInteractive && (
          <Tooltip className={styles.tooltip} content={t('removeAllOption')} backgroundColor='var(--icon-secondary)'>
            <button
              type='button'
              className={classNames(styles.value__remove, {}, [styles.value__remove_all])}
              onClick={handleRemoveAll}
              onKeyDown={handleRemoveAll}
              data-ignore-element={selectId}
              aria-label={t('removeAllOption')}
            >
              <Icon type='cross' color={iconColor} aria-hidden />
            </button>
          </Tooltip>
        )}
      </div>
    );
  }
);
