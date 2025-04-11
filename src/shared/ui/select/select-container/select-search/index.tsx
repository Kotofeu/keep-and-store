'use client';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import { useSelectContext } from '../../select-provider';

interface SelectSearchProps {
  className?: string;
}

export const SelectSearch: FC<SelectSearchProps> = ({ className }) => {
  const t = useTranslations('Shared.Select');

  const { selectId, searchValue, isOpen, searchInputRef, onSearchChange } = useSelectContext();
  return (
    <div className={classNames(styles.search, {}, [className])}>
      <input
        className={styles.input}
        type='text'
        placeholder={t('search')}
        value={searchValue}
        onChange={e => onSearchChange?.(e.target.value)}
        tabIndex={isOpen ? undefined : -1}
        ref={searchInputRef}
        aria-controls={`${selectId}-listbox`}
      />
    </div>
  );
};
