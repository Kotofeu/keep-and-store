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
  onChangeOption: (index: number) => void;
}

export const ItemsList = memo(
  ({ options, focusedIndex, focusedOptionRef, multiple, selectedOptions, onChangeOption }: ItemsListProps) => (
    <ul className={styles.list}>
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
          >
            {option.ui || option.label}
          </li>
        );
      })}
    </ul>
  )
);
