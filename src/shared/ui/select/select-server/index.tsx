import { FC, Ref } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';
import { SelectedItem } from '../selected-item';
import { ItemsList } from '../items-list';

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
  containerRef: Ref<HTMLDivElement> | undefined | null;
  onChangeOption: (index: number) => void;
  onSearchChange?: (term: string) => void;
  toggleDropdown: () => void;
  onRemoveOption: (option: Option) => void;
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
  containerRef,
  onChangeOption,
  onSearchChange,
  toggleDropdown,
  onRemoveOption
}) => {
  const t = useTranslations('Shared.Select');
  return (
    <div className={classNames(styles.select, {}, [className])}>
      <SelectedItem
        multiple={multiple}
        placeholder={placeholder}
        options={selectedOptions}
        onRemoveOption={onRemoveOption}
        toggleDropdown={toggleDropdown}
      />
      <div className={classNames(styles.select__dropdown, { [styles.select__dropdown_show]: isOpen })}>
        {searchable && (
          <div className={styles.select__searchBox}>
            <input
              type='text'
              placeholder={t('search')}
              value={searchTerm}
              onChange={e => onSearchChange?.(e.target.value)}
              className={styles.select__search}
            />
          </div>
        )}
        <ItemsList
          options={options}
          focusedIndex={focusedIndex}
          focusedOptionRef={focusedOptionRef}
          multiple={multiple}
          selectedOptions={selectedOptions}
          onChangeOption={onChangeOption}
        />
      </div>
    </div>
  );
};
