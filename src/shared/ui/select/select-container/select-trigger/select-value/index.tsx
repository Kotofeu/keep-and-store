'use client';
import { memo, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import { Option } from '../../..';
import { Tooltip } from '../../../../tooltip';
import { Icon } from '../../../../icon';
import styles from './styles.module.scss';
import { SelectValueProps } from '../../../types';

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

    const showMaxSelected = maxSelectedItemsCount && multiple && hasSelectedOptions;
    const maxShowText = `${selectedOptions.length}/${maxSelectedItemsCount}`;

    const label = showMaxSelected
      ? t('selectedByMaxSelected', { selected: selectedOptions.length, maxSelected: maxSelectedItemsCount })
      : t('selected');
    return (
      <div className={styles.value}>
        <div
          className={styles.value__options}
          id={`${selectId}-label`}
          aria-label={
            selectedOptions.length ? `${label}: ${selectedOptions.map(option => option.label).join(', ')}` : placeholder
          }
        >
          {showMaxSelected && (
            <div className={styles.value__counter} aria-label={maxShowText}>
              <span aria-hidden>{selectedOptions.length}</span>
              <span aria-hidden>/</span>
              <span aria-hidden>{maxSelectedItemsCount}</span>
            </div>
          )}

          {hasSelectedOptions
            ? selectedOptions.map(option => (
                <div
                  key={option.value}
                  className={classNames(styles.value__selected, {
                    [styles.value__selected_multiple]: multiple
                  })}
                  aria-label={option.label}
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
                </div>
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
