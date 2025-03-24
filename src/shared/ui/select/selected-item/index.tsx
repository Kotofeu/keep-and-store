import { useTranslations } from 'next-intl';
import { memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { Icon } from '../../icon';
import { SelectedItemProps } from '../types';
import { StatusIcons } from '../../status-icons';

export const SelectedItem = memo(
  <T,>({
    placeholder,
    options,
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
        onClick={toggleDropdown}
      >
        <StatusIcons
          className={styles.value__status}
          statusValues={{ error, warning, success }}
          data-ignore-element={`${selectId}`}
        />
        <div className={styles.value__options}>
          {!!maxSelectedItemsCount && multiple && !!options.length && (
            <div className={styles.value__counter}>
              <span>{options.length}</span>
              <span>/</span>
              <span>{maxSelectedItemsCount}</span>
            </div>
          )}
          {options.length > 0
            ? options.map(option => (
                <span
                  key={option.value}
                  className={classNames(styles.value__selected, {
                    [styles.value__selected_multiple]: !!multiple
                  })}
                >
                  {option.ui || option.label}
                  {multiple && (
                    <button
                      type='button'
                      className={styles.value__remove}
                      onClick={e => {
                        e.stopPropagation();
                        onRemoveOption(option);
                      }}
                      title={t('removeOption', { optionLabel: option.label })}
                      data-ignore-element={`${selectId}`}
                      aria-label={t('removeOption', { optionLabel: option.label })}
                    >
                      <Icon
                        type='cross'
                        color={disabled || isLoading ? 'var(--icon-secondary-disabled)' : 'var(--icon-secondary)'}
                      />
                    </button>
                  )}
                </span>
              ))
            : placeholder}
        </div>
        <div className={styles.value__buttons}>
          {!required && !!options.length && !disabled && !isLoading && (
            <button
              type='button'
              className={classNames(styles.value__remove, {}, [styles.value__remove_all])}
              onClick={e => {
                e.stopPropagation();
                removeAllOptions();
              }}
              title={t('removeAllOption')}
              data-ignore-element={`${selectId}`}
              aria-label={t('removeAllOption')}
            >
              <Icon type='cross' color={'var(--icon-secondary)'} />
            </button>
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
            />
          )}
        </div>
      </div>
    );
  }
) as <T>(props: SelectedItemProps<T>) => ReactNode;
