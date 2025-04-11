'use client';

import { classNames } from '@/shared/lib';

import { SelectSearch } from '../select-search';
import { SelectList } from '../select-list';
import styles from './styles.module.scss';
import { useSelectContext } from '../select-provider';
import { SelectTrigger } from '../select-trigger';

interface SelectContainerProps {
  className?: string;
  placeholder?: string;
}

export const SelectContainer = ({ className, placeholder }: SelectContainerProps) => {
  const context = useSelectContext();

  return (
    <div
      className={classNames(styles.select, {}, [className])}
      onKeyDown={context.itemsListNavigation}
      ref={context.ref}
      tabIndex={-1}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={context.isOpen}
      aria-disabled={context.disabled}
      aria-busy={context.isLoading}
      aria-controls={`${context.selectId}-listbox`}
      aria-required={context.required}
      aria-label={placeholder}
    >
      <SelectTrigger className={styles.trigger} placeholder={placeholder} />
      <div
        className={classNames(
          styles.select__dropdown,
          {
            [styles.select__dropdown_isOpen]: !!context.isOpen,
            [styles.select__dropdown_success]: !!context.success,
            [styles.select__dropdown_warning]: !!context.warning,
            [styles.select__dropdown_error]: !!context.error
          },
          [styles[context.openPosition]]
        )}
        style={{ maxHeight: context.dropdownHeight }}
        id={`${context.selectId}-listbox`}
        role='listbox'
        aria-multiselectable={context.multiple}
        aria-activedescendant={
          context.focusedIndex !== -1 ? `${context.selectId}-option-${context.focusedIndex}` : undefined
        }
        aria-hidden={!context.isOpen}
        tabIndex={-1}
      >
        <SelectSearch className={styles.search} />
        <SelectList />
      </div>
    </div>
  );
};
