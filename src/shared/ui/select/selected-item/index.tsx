import { useTranslations } from 'next-intl';
import { memo, ReactNode, useCallback } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { Icon } from '../../icon';
import { Option, SelectedItemsProps } from '../types';
import { StatusIcons } from '../../status-icons';
import { Tooltip } from '../../tooltip';

export const SelectedItem = memo(
  <T,>({
    placeholder,
    selectedOptions,
    selectId,
    multiple,
    required,
    error,
    warning,
    success,
    isOpen,
    disabled,
    isLoading,
    maxSelectedItemsCount,
    openPosition,
    selectorRef,
    onRemoveOption,
    toggleDropdown,
    onSelectKeyDown,
    removeAllOptions
  }: SelectedItemsProps<T>) => {
    const t = useTranslations('Shared.Select');
    const hasSelectedOptions = selectedOptions.length > 0;
    const isInteractive = !disabled && !isLoading;
    const iconColor = isInteractive ? 'var(--icon-secondary)' : 'var(--icon-secondary-disabled)';

    const handleRemoveOption = useCallback(
      (option: Option<T>, e: React.MouseEvent | React.KeyboardEvent) => {
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
      <div
        className={classNames(styles.value, {
          [styles.value_isOpen]: isOpen,
          [styles.value_top]: isOpen && openPosition === 'top',
          [styles.value_disabled]: disabled || isLoading,
          [styles.value_error]: !!error,
          [styles.value_warning]: !!warning,
          [styles.value_success]: !!success
        })}
        ref={selectorRef}
        onKeyDown={onSelectKeyDown}
        onClick={toggleDropdown}
        tabIndex={disabled ? -1 : 0}
        role='button'
      >
        <StatusIcons
          className={styles.value__status}
          statusValues={{ error, warning, success }}
          onClick={e => e.stopPropagation()}
        />

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

        <div className={styles.value__buttons}>
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

          {isLoading ? (
            <div className={styles.value__loader} aria-hidden>
              <div />
              <div />
              <div />
            </div>
          ) : (
            <Icon
              className={classNames(styles.value__arrow, {
                [styles.value__arrow_rotate]: isOpen,
                [styles.value__arrow_top]: isOpen && openPosition === 'top'
              })}
              type='arrowDown'
              color={iconColor}
              aria-hidden
            />
          )}
        </div>
      </div>
    );
  }
) as <T>(props: SelectedItemsProps<T>) => ReactNode;
