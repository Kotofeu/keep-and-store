import { FC, Ref } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';
import { SelectedItem } from '../selected-item';
import { ItemsList } from '../items-list';
import { DropdownHeight } from '../select-client';

interface SelectServerProps {
  className?: string;
  options: Option[];
  placeholder?: string;
  selectedOptions: Option[];
  searchable?: boolean;
  isOpen: boolean;
  searchTerm?: string;
  focusedIndex?: number;
  multiple?: boolean;
  focusedOptionRef: Ref<HTMLLIElement> | undefined | null;
  dropdownHeight: DropdownHeight;
  onChangeOption: (index: number) => void;
  onSearchChange?: (term: string) => void;
  toggleDropdown: () => void;
  onRemoveOption: (option: Option) => void;
  selectId: string;
  disabled?: boolean;
}

export const SelectServer: FC<SelectServerProps> = ({
  className,
  options,
  placeholder,
  selectedOptions,
  searchable,
  isOpen,
  searchTerm,
  focusedIndex,
  multiple,
  focusedOptionRef,
  dropdownHeight,
  onChangeOption,
  onSearchChange,
  toggleDropdown,
  onRemoveOption,
  selectId,
  disabled
}) => {
  const t = useTranslations('Shared.Select');

  return (
    <div className={classNames(styles.select, {}, [className])}>
      <SelectedItem
        multiple={multiple}
        placeholder={placeholder}
        options={selectedOptions}
        isOpen={isOpen}
        onRemoveOption={onRemoveOption}
        toggleDropdown={toggleDropdown}
        selectId={selectId}
        disabled={disabled}
      />
      <div
        className={classNames(styles.select__dropdown, {
          [styles.select__dropdown_isOpen]: isOpen,
          [styles[dropdownHeight]]: typeof dropdownHeight === 'string'
        })}
        data-dropdown-height={typeof dropdownHeight === 'number' && dropdownHeight}
        id={`${selectId}-listbox`}
        aria-labelledby={`${selectId}-label`}
      >
        {searchable && (
          <div className={styles.select__searchBox}>
            <input
              id={`${selectId}-search`}
              type='text'
              placeholder={t('search')}
              value={searchTerm}
              onChange={e => onSearchChange?.(e.target.value)}
              className={styles.select__search}
              aria-label={t('search')}
              aria-controls={`${selectId}-listbox`}
            />
          </div>
        )}
        <ItemsList
          options={options}
          focusedIndex={focusedIndex}
          focusedOptionRef={focusedOptionRef}
          multiple={multiple}
          selectedOptions={selectedOptions}
          isOpen={isOpen && !disabled}
          onChangeOption={onChangeOption}
          selectId={selectId}
        />
      </div>
    </div>
  );
};
