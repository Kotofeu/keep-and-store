/* eslint-disable prettier/prettier */
import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';
import { Icon } from '../../icon';

interface SelectedItemProps {
  multiple?: boolean;
  placeholder?: string;
  options: Option[];
  onRemoveOption: (option: Option) => void;
  toggleDropdown: () => void;
}

export const SelectedItem: FC<SelectedItemProps> = ({
  multiple,
  options,
  placeholder,
  onRemoveOption,
  toggleDropdown
}) => {
  const t = useTranslations('BaseLabels');

  return (
    <div className={styles.value} onClick={toggleDropdown}>
      {options.length > 0
        ? options.map(option => (
          <span
            key={option.value}
            className={classNames(styles.value__selected, {
              [styles.value__selected_multiple]: !!multiple
            })}
          >
            {option.ui || option.label}
            {multiple && (
              <button
                type='button'
                className={styles.value__remove}
                onClick={e => {
                  e.stopPropagation();
                  onRemoveOption(option);
                }}
                title={t('delete')}
                data-remove-button
              >
                <Icon type='cross' />
              </button>
            )}
          </span>
        ))
        : placeholder}
    </div>
  );
};
