'use client';
import { memo, ReactNode } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { ItemsListProps } from '../types';

export const ItemsList = memo(
  <T,>({
    visibleItems,
    selectedOptions,
    selectId,
    multiple,
    isOpen,
    focusedIndex,
    gap,
    itemHeight,
    listHeight,
    listOffsetY,
    loadingError,
    focusedOptionRef,
    listContainerRef,
    onChangeOption
  }: ItemsListProps<T>) => {
    const t = useTranslations('Shared.Select');
    return (
      <div className={styles.container} ref={listContainerRef}>
        <div className={classNames(styles.wrapper, { [styles.wrapper_isOpen]: isOpen })} style={{ height: listHeight }}>
          <ul
            className={styles.list}
            style={{ transform: listOffsetY ? `translateY(${listOffsetY}px)` : 'none', gap }}
            role='listbox'
            aria-labelledby={`${selectId}-label`}
          >
            {!!visibleItems.length && !loadingError ? (
              visibleItems.map(({ item: option, index: visibleIndex }) => {
                const isSelected = selectedOptions.some(o => o.value === option.value);
                return (
                  <li
                    key={option.value}
                    ref={visibleIndex === focusedIndex ? focusedOptionRef : null}
                    className={classNames(styles.list__option, {
                      [styles.list__option_multiple]: !!multiple,
                      [styles.list__option_focused]: focusedIndex === visibleIndex,
                      [styles.list__option_selected]: isSelected,
                      [styles.list__option_disable]: !!option.disabled
                    })}
                    onClick={() =>
                      (!isSelected || multiple) && !option.disabled ? onChangeOption(visibleIndex) : undefined
                    }
                    role='option'
                    aria-selected={isSelected}
                    id={`${selectId}-option-${visibleIndex}`}
                    aria-label={option.label}
                    style={{ height: `${itemHeight}px` }}
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
                style={{ height: `${itemHeight}px` }}
              >
                {loadingError || t('emptyList')}
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
) as <T>(props: ItemsListProps<T>) => ReactNode;
