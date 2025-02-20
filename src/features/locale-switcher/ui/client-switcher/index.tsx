'use client';
import { FC, useTransition } from 'react';
import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/shared/i18n';
import { Select } from '@/shared/ui/select';
import { Option } from '@/shared/types';

import styles from './styles.module.scss';

type SwitcherSelectProps = {
  value: Option;
  options: Option[];
};

export const ClientSelect: FC<SwitcherSelectProps> = ({ value, options }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  function onSelectChange(option: Option) {
    startTransition(() => {
      router.replace({ pathname, ...(params ? { params } : {}) }, { locale: option.value });
    });
  }

  return (
    <Select
      value={value}
      className={styles.locale}
      options={options}
      onChange={option => onSelectChange(option as Option)}
      disabled={isPending}
      searchable
    />
  );
};
