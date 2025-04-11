'use client';
import { classNames } from '@/shared/lib';
import { Icon } from '@/shared/ui/icon';
import { StatusIcons } from '@/shared/ui/status-icons';

import styles from './styles.module.scss';
import { useSelectContext } from '../../select-provider';
import { SelectValue } from './select-value';

interface SelectValueProps {
  className?: string;
  placeholder?: string;
}

export const SelectTrigger = ({ className, placeholder }: SelectValueProps) => {
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
        styles.trigger,
        {
          [styles.trigger_isOpen]: isOpen,
          [styles.trigger_top]: isOpen && openPosition === 'top',
          [styles.trigger_disabled]: disabled || isLoading,
          [styles.trigger_error]: !!error,
          [styles.trigger_warning]: !!warning,
          [styles.trigger_success]: !!success
        },
        [className]
      )}
      ref={selectorRef}
      onKeyDown={onSelectKeyDown}
      onClick={toggleDropdown}
      tabIndex={disabled ? -1 : 0}
      role='button'
      aria-labelledby={`${selectId}-label`}
      aria-controls={`${selectId}-listbox`}
    >
      <StatusIcons
        className={styles.trigger__status}
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
      <div className={styles.trigger__icons} aria-hidden>
        {isLoading ? (
          <div className={styles.trigger__loader}>
            <div />
            <div />
            <div />
          </div>
        ) : (
          <Icon
            className={classNames(styles.trigger__arrow, {
              [styles.trigger__arrow_rotate]: isOpen,
              [styles.trigger__arrow_top]: isOpen && openPosition === 'top'
            })}
            type='arrowDown'
            color={iconColor}
          />
        )}
      </div>
    </div>
  );
};
