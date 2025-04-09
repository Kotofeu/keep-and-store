'use client';
import { memo, ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { ItemsListProps } from '../types';

export const ItemsList = memo(
  <T,>({
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
  }: ItemsListProps<T>) => {
    const t = useTranslations('Shared.Select');
    return (
      <div className={styles.container} ref={listContainerRef} tabIndex={-1}>
        <div className={styles.wrapper} style={{ height: listHeight }}>
          <ul className={styles.list} style={{ transform: listOffsetY ? `translateY(${listOffsetY}px)` : 'none', gap }}>
            {!!visibleOptions.length ? (
              visibleOptions.map(({ item: option, index: visibleIndex }) => {
                const isSelected = selectedOptions.some(o => o.value === option.value);
                const isDisabled =
                  ((maxSelectedItemsCount && selectedOptions.length >= maxSelectedItemsCount) || !!option.disabled) &&
                  !isSelected;
                return (
                  <li
                    key={option.value}
                    ref={visibleIndex === focusedIndex ? focusedOptionRef : null}
                    className={classNames(styles.list__option, {
                      [styles.list__option_multiple]: !!multiple,
                      [styles.list__option_focused]: focusedIndex === visibleIndex,
                      [styles.list__option_selected]: isSelected,
                      [styles.list__option_disable]: isDisabled
                    })}
                    onClick={() =>
                      (!isSelected || multiple) && !isDisabled ? onChangeOption(visibleIndex) : undefined
                    }
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
                    aria-current={focusedIndex === visibleIndex}
                    id={`${selectId}-option-${visibleIndex}`}
                  >
                    {option.ui || option.label}
                  </li>
                );
              })
            ) : (
              <li
                className={classNames(styles.list__option, {}, [styles.list__option_disable])}
                role='option'
                aria-selected={false}
                id={`${selectId}-option-empty`}
                aria-label={t('emptyList')}
                aria-disabled='true'
                style={{ height: `${itemHeight}px` }}
              >
                {error && typeof error === 'string' ? error : t('emptyList')}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
) as <T>(props: ItemsListProps<T>) => ReactNode;
