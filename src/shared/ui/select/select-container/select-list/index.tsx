'use client';

import { FC, memo } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { useSelectContext } from '../../select-provider';

export const SelectList: FC = memo(({}) => {
  const t = useTranslations('Shared.Select');
  const {
    visibleOptions,
    selectedOptions,
    selectId,
    multiple,
    focusedIndex,
    maxSelectedItemsCount,
    error,
    gap,
    itemHeight,
    listHeight,
    listOffsetY,
    focusedOptionRef,
    listContainerRef,
    onChangeOption
  } = useSelectContext();
  return (
    <div className={styles.container} ref={listContainerRef} tabIndex={-1}>
      <div className={styles.wrapper} style={{ height: listHeight }}>
        <div
          className={styles.list}
          style={{ transform: listOffsetY ? `translateY(${listOffsetY}px)` : 'none', gap }}
          aria-multiselectable={multiple}
          aria-labelledby={`${selectId}-label`}
          role='listbox'
          id={`${selectId}-listbox`}
        >
          {!!visibleOptions.length ? (
            visibleOptions.map(({ item: option, index: visibleIndex }) => {
              const isSelected = selectedOptions.some(o => o.value === option.value);
              const isDisabled =
                ((maxSelectedItemsCount && selectedOptions.length >= maxSelectedItemsCount) || !!option.disabled) &&
                !isSelected;
              return (
                <div
                  key={option.value}
                  ref={visibleIndex === focusedIndex ? focusedOptionRef : null}
                  className={classNames(styles.list__option, {
                    [styles.list__option_multiple]: !!multiple,
                    [styles.list__option_selected]: isSelected,
                    [styles.list__option_disable]: isDisabled
                  })}
                  onClick={() => ((!isSelected || multiple) && !isDisabled ? onChangeOption(visibleIndex) : undefined)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && (!isSelected || multiple) && !isDisabled) {
                      e.preventDefault();
                      onChangeOption(visibleIndex);
                    }
                  }}
                  style={{ height: `${itemHeight}px` }}
                  role='option'
                  aria-selected={isSelected}
                  aria-disabled={isDisabled}
                  id={`${selectId}-option-${visibleIndex}`}
                  tabIndex={-1}
                >
                  {option.ui || option.label}
                </div>
              );
            })
          ) : (
            <div
              className={classNames(styles.list__option, {}, [styles.list__option_disable])}
              style={{ height: `${itemHeight}px` }}
              role='option'
              aria-selected={false}
              aria-disabled={true}
              id={`${selectId}-option-${error ? 'error' : 'empty'}`}
            >
              {error && typeof error === 'string' ? error : t('emptyList')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
