import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { SelectedItem } from '../selected-item';
import { ItemsList } from '../items-list';
import { SelectServerProps } from '../types';

export const SelectServer = <T,>({
  className,
  placeholder,
  selectedOptions,
  selectId,
  visibleItems,
  searchable,
  isOpen,
  required,
  multiple,
  disabled,
  isLoading,
  maxSelectedItemsCount,
  dropdownHeight,
  gap,
  itemHeight,
  listHeight,
  listOffsetY,
  focusedIndex,
  searchValue,
  error,
  warning,
  success,
  focusedOptionRef,
  listContainerRef,
  ref,
  handleKeyDown,
  openSelectByEnter,
  onChangeOption,
  onSearchChange,
  toggleDropdown,
  onRemoveOption,
  removeAllOptions
}: SelectServerProps<T>) => {
  const t = useTranslations('Shared.Select');
  return (
    <div
      className={classNames(styles.select, {}, [className])}
      ref={ref}
      onKeyDown={isOpen && !isLoading && !error ? handleKeyDown : openSelectByEnter}
      id={`${selectId}-label`}
      tabIndex={0}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-label={placeholder || t('selectOption')}
      aria-owns={`${selectId}-listbox`}
      aria-controls={`${selectId}-listbox`}
    >
      <SelectedItem
        maxSelectedItemsCount={maxSelectedItemsCount}
        multiple={multiple}
        required={required}
        placeholder={placeholder}
        error={error}
        warning={warning}
        success={success}
        options={selectedOptions}
        isOpen={isOpen}
        onRemoveOption={onRemoveOption}
        toggleDropdown={toggleDropdown}
        removeAllOptions={removeAllOptions}
        selectId={selectId}
        disabled={disabled}
        isLoading={isLoading}
      />
      <div
        className={classNames(styles.select__dropdown, {
          [styles.select__dropdown_isOpen]: !!isOpen,
          [styles.select__dropdown_success]: !!success,
          [styles.select__dropdown_warning]: !!warning,
          [styles.select__dropdown_error]: !!error
        })}
        style={{ maxHeight: dropdownHeight }}
        id={`${selectId}-listbox`}
        aria-labelledby={`${selectId}-label`}
      >
        {searchable && (
          <div className={styles.select__searchBox}>
            <input
              id={`${selectId}-search`}
              type='text'
              placeholder={t('search')}
              value={searchValue}
              onChange={e => onSearchChange?.(e.target.value)}
              className={styles.select__search}
              aria-label={t('search')}
              aria-controls={`${selectId}-listbox`}
              tabIndex={isOpen ? undefined : -1}
            />
          </div>
        )}
        <ItemsList
          focusedIndex={focusedIndex}
          focusedOptionRef={focusedOptionRef}
          multiple={multiple}
          selectedOptions={selectedOptions}
          error={typeof error === 'string' ? error : undefined}
          onChangeOption={onChangeOption}
          selectId={selectId}
          maxSelectedItemsCount={maxSelectedItemsCount}
          listHeight={listHeight}
          listContainerRef={listContainerRef}
          gap={gap}
          visibleItems={visibleItems}
          listOffsetY={listOffsetY}
          itemHeight={itemHeight}
        />
      </div>
    </div>
  );
};
