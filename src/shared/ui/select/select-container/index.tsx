'use client';

import { classNames } from '@/shared/lib';

import { SelectSearch } from './select-search';
import { SelectList } from './select-list';
import styles from './styles.module.scss';
import { useSelectContext } from '../select-provider';
import { SelectTrigger } from './select-trigger';

interface SelectContainerProps {
  className?: string;
  placeholder?: string;
}

export const SelectContainer = ({ className, placeholder }: SelectContainerProps) => {
  const {
    isOpen,
    disabled,
    isLoading,
    required,
    selectId,
    searchable,
    success,
    warning,
    error,
    openPosition,
    dropdownHeight,
    ref,
    onSelectNavigation
  } = useSelectContext();

  return (
    <div
      className={classNames(styles.select, {}, [className])}
      onKeyDown={onSelectNavigation}
      ref={ref}
      role='combobox'
      aria-controls={`${selectId}-listbox`}
      aria-labelledby={`${selectId}-label`}
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-disabled={disabled}
      aria-required={required}
      aria-busy={isLoading}
      aria-invalid={!!error}
      tabIndex={-1}
    >
      <SelectTrigger className={styles.trigger} placeholder={placeholder} />
      <div
        className={classNames(
          styles.select__dropdown,
          {
            [styles.select__dropdown_isOpen]: !!isOpen,
            [styles.select__dropdown_success]: !!success,
            [styles.select__dropdown_warning]: !!warning,
            [styles.select__dropdown_error]: !!error
          },
          [styles[openPosition]]
        )}
        style={{ maxHeight: dropdownHeight }}
      >
        {searchable && <SelectSearch className={styles.search} />}
        <SelectList />
      </div>
    </div>
  );
};
