import { useTranslations } from 'next-intl';
import { memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { Icon } from '../../icon';
import { SelectedItemProps } from '../types';
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
    onRemoveOption,
    toggleDropdown,
    onSelectKeyDown,
    removeAllOptions
  }: SelectedItemProps<T>) => {
    const t = useTranslations('Shared.Select');

    return (
      <div
        className={classNames(styles.value, {
          [styles.value_isOpen]: !!isOpen,
          [styles.value_disabled]: !!disabled || isLoading,
          [styles.value_error]: !!error,
          [styles.value_warning]: !!warning,
          [styles.value_success]: !!success
        })}
        onKeyDown={onSelectKeyDown}
        onClick={toggleDropdown}
        tabIndex={disabled ? -1 : 0}
        role='button'
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-label={placeholder || t('selectOption')}
        aria-disabled={disabled}
        aria-busy={isLoading}
      >
        <StatusIcons
          className={styles.value__status}
          statusValues={{ error, warning, success }}
          onClick={e => e.stopPropagation()}
        />
        <div className={styles.value__options}>
          {!!maxSelectedItemsCount && multiple && !!selectedOptions.length && (
            <div className={styles.value__counter}>
              <span>{selectedOptions.length}</span>
              <span>/</span>
              <span>{maxSelectedItemsCount}</span>
            </div>
          )}
          {selectedOptions.length > 0
            ? selectedOptions.map(option => (
                <span
                  key={option.value}
                  className={classNames(styles.value__selected, {
                    [styles.value__selected_multiple]: !!multiple
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
                        onClick={e => {
                          e.stopPropagation();
                          onRemoveOption(option);
                        }}
                        data-ignore-element={`${selectId}`}
                        aria-label={t('removeOption', { optionLabel: option.label })}
                      >
                        <Icon
                          type='cross'
                          color={disabled || isLoading ? 'var(--icon-secondary-disabled)' : 'var(--icon-secondary)'}
                          aria-hidden
                        />
                      </button>
                    </Tooltip>
                  )}
                </span>
              ))
            : placeholder}
        </div>
        <div className={styles.value__buttons}>
          {!required && !!selectedOptions.length && !disabled && !isLoading && (
            <Tooltip className={styles.tooltip} content={t('removeAllOption')} backgroundColor='var(--icon-secondary)'>
              <button
                type='button'
                className={classNames(styles.value__remove, {}, [styles.value__remove_all])}
                onClick={e => {
                  e.stopPropagation();
                  removeAllOptions();
                }}
                data-ignore-element={`${selectId}`}
                aria-label={t('removeAllOption')}
              >
                <Icon type='cross' color={'var(--icon-secondary)'} aria-hidden />
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
              className={classNames(styles.value__arrow, { [styles.value__arrow_rotate]: !!isOpen })}
              type='arrowDown'
              color={disabled || isLoading ? 'var(--icon-secondary-disabled)' : 'var(--icon-secondary)'}
              aria-hidden
            />
          )}
        </div>
      </div>
    );
  }
) as <T>(props: SelectedItemProps<T>) => ReactNode;
