'use client';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { SelectedItem } from '../selected-item';
import { ItemsList } from '../items-list';
import { SelectComponentProps } from '../types';

export const SelectComponent = <T,>({
  className,
  placeholder,
  selectedOptions,
  selectId,
  visibleOptions,
  focusedIndex,
  searchable,
  isOpen,
  required,
  multiple,
  disabled,
  isLoading,
  maxSelectedItemsCount,
  dropdownHeight,
  openPosition,
  gap,
  itemHeight,
  listHeight,
  listOffsetY,
  searchValue,
  error,
  warning,
  success,
  focusedOptionRef,
  searchInputRef,
  listContainerRef,
  selectorRef,
  ref,
  onSelectKeyDown,
  itemsListNavigation,
  onChangeOption,
  onSearchChange,
  toggleDropdown,
  onRemoveOption,
  removeAllOptions
}: SelectComponentProps<T>) => {
  const t = useTranslations('Shared.Select');

  return (
    <div
      className={classNames(styles.select, {}, [className])}
      onKeyDown={itemsListNavigation}
      ref={ref}
      tabIndex={-1}
      role='combobox'
      aria-haspopup='listbox'
      aria-expanded={isOpen}
      aria-disabled={disabled}
      aria-busy={isLoading}
      aria-controls={`${selectId}-listbox`}
      aria-labelledby={`${selectId}-label`}
    >
      <SelectedItem
        placeholder={placeholder}
        selectedOptions={selectedOptions}
        selectId={selectId}
        multiple={multiple}
        required={required}
        success={success}
        warning={warning}
        error={error}
        isOpen={isOpen}
        disabled={disabled}
        isLoading={isLoading}
        maxSelectedItemsCount={maxSelectedItemsCount}
        openPosition={openPosition}
        selectorRef={selectorRef}
        onRemoveOption={onRemoveOption}
        toggleDropdown={toggleDropdown}
        onSelectKeyDown={onSelectKeyDown}
        removeAllOptions={removeAllOptions}
      />
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
        id={`${selectId}-listbox`}
        role='listbox'
        aria-multiselectable={multiple}
      >
        {searchable && (
          <div className={styles.select__searchBox}>
            <input
              className={styles.select__search}
              id={`${selectId}-search`}
              type='text'
              placeholder={t('search')}
              value={searchValue}
              onChange={e => onSearchChange?.(e.target.value)}
              tabIndex={isOpen ? undefined : -1}
              ref={searchInputRef}
              aria-label={t('search')}
              aria-controls={`${selectId}-listbox`}
            />
          </div>
        )}
        <ItemsList
          visibleOptions={visibleOptions}
          selectedOptions={selectedOptions}
          selectId={selectId}
          multiple={multiple}
          focusedIndex={focusedIndex}
          maxSelectedItemsCount={maxSelectedItemsCount}
          error={error}
          gap={gap}
          itemHeight={itemHeight}
          listHeight={listHeight}
          listOffsetY={listOffsetY}
          listContainerRef={listContainerRef}
          focusedOptionRef={focusedOptionRef}
          onChangeOption={onChangeOption}
        />
      </div>
    </div>
  );
};
