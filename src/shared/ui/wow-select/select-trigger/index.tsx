'use client';
import { memo } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { Icon } from '../../icon';
import { StatusIcons } from '../../status-icons';
import { useSelectContext } from '../select-provider';
import { SelectValue } from '../select-value';

interface SelectValueProps {
  className?: string;
  placeholder?: string;
}

export const SelectTrigger = memo(({ className, placeholder }: SelectValueProps) => {
  const {
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
  } = useSelectContext();
  const isInteractive = !disabled && !isLoading;
  const iconColor = isInteractive ? 'var(--icon-secondary)' : 'var(--icon-secondary-disabled)';

  return (
    <div
      className={classNames(
        styles.value,
        {
          [styles.value_isOpen]: isOpen,
          [styles.value_top]: isOpen && openPosition === 'top',
          [styles.value_disabled]: disabled || isLoading,
          [styles.value_error]: !!error,
          [styles.value_warning]: !!warning,
          [styles.value_success]: !!success
        },
        [className]
      )}
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
      <SelectValue
        placeholder={placeholder}
        selectedOptions={selectedOptions}
        selectId={selectId}
        multiple={multiple}
        disabled={disabled}
        isLoading={isLoading}
        required={required}
        maxSelectedItemsCount={maxSelectedItemsCount}
        selectorRef={selectorRef}
        onRemoveOption={onRemoveOption}
        removeAllOptions={removeAllOptions}
      />
      <div className={styles.value__buttons}>
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
});
