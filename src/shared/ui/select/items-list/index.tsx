import { memo, Ref } from 'react';

import { Option } from '@/shared/types';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

interface ItemsListProps {
  options: Option[];
  focusedIndex?: number;
  focusedOptionRef: Ref<HTMLLIElement> | undefined | null;
  multiple?: boolean;
  selectedOptions: Option[];
  isOpen: boolean;
  onChangeOption: (index: number) => void;
  selectId: string;
}

export const ItemsList = memo(
  ({
    options,
    focusedIndex,
    focusedOptionRef,
    multiple,
    selectedOptions,
    isOpen,
    onChangeOption,
    selectId
  }: ItemsListProps) => (
    <ul
      className={classNames(styles.list, { [styles.list_isOpen]: isOpen })}
      role='listbox'
      aria-labelledby={`${selectId}-label`}
    >
      {options.map((option, index) => {
        const isSelected = selectedOptions.some(o => o.value === option.value);
        return (
          <li
            key={option.value}
            ref={index === focusedIndex ? focusedOptionRef : null}
            className={classNames(styles.list__option, {
              [styles.list__option_multiple]: !!multiple,
              [styles.list__option_focused]: focusedIndex === index,
              [styles.list__option_selected]: isSelected
            })}
            onClick={() => (!isSelected || multiple ? onChangeOption(index) : undefined)}
            role='option'
            aria-selected={isSelected}
            id={`${selectId}-option-${index}`}
            aria-label={option.label}
          >
            {option.ui || option.label}
          </li>
        );
      })}
    </ul>
  )
);
