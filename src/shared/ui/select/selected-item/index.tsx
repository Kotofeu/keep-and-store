/* eslint-disable prettier/prettier */
import { FC, memo } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';
import { Icon } from '../../icon';

interface SelectedItemProps {
  multiple?: boolean;
  placeholder?: string;
  options: Option[];
  isOpen: boolean;
  onRemoveOption: (option: Option) => void;
  toggleDropdown: () => void;
  selectId: string;
  disabled?: boolean;
}

export const SelectedItem: FC<SelectedItemProps> = memo(({
  multiple,
  options,
  placeholder,
  isOpen,
  onRemoveOption,
  toggleDropdown,
  selectId,
  disabled
}) => {
  const t = useTranslations();

  return (
    <div
      className={classNames(styles.value, { [styles.value_isOpen]: isOpen, [styles.value_disabled]: !!disabled })}
      onClick={toggleDropdown}
      id={`${selectId}-label`}
      aria-label={placeholder || t('Shared.Select.selectOption')}
    >
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
                title={t('BaseLabels.delete')}
                data-ignore-element={`${selectId}`}
                aria-label={t('Shared.Select.removeOption', { optionLabel: option.label })}
              >
                <Icon type='cross' color={disabled? 'var(--icon-disable)':'var(--icon)'}/>
              </button>
            )}
          </span>
        ))
        : placeholder}
    </div>
  );
});