/* eslint-disable indent */
import { useTranslations } from 'next-intl';
import { memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { Icon } from '../../icon';
import { SelectedItemProps } from '../types';

export const SelectedItem = memo(
  <T,>({
    placeholder,
    options,
    selectId,
    multiple,
    required,
    isOpen,
    disabled,
    isLoading,
    onRemoveOption,
    toggleDropdown,
    removeAllOptions
  }: SelectedItemProps<T>) => {
    const t = useTranslations('Shared.Select');

    return (
      <div
        className={classNames(styles.value, {
          [styles.value_isOpen]: isOpen,
          [styles.value_disabled]: !!disabled || isLoading,
          [styles.value_isExtraControls]: (!required && !!options.length && !disabled) || isLoading
        })}
        onClick={toggleDropdown}
        id={`${selectId}-label`}
        aria-label={placeholder || t('selectOption')}
      >
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
          <div className={styles.value_isLoading} aria-hidden>
            <div />
            <div />
            <div />
          </div>
        ) : (
          <Icon
            className={classNames(styles.value__arrow, { [styles.value__arrow_rotate]: isOpen })}
            type='arrowDown'
            color={disabled || isLoading ? 'var(--icon-secondary-disabled)' : 'var(--icon-secondary)'}
          />
        )}
      </div>
    );
  }
) as <T>(props: SelectedItemProps<T>) => ReactNode;
