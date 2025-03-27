'use client';
import { FC, useTransition } from 'react';
import { useParams } from 'next/navigation';

import { Locale, routing, usePathname, useRouter } from '@/shared/i18n';
import { Option, Select } from '@/shared/ui/select';

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
  function onSelectChange(option: Option | Option[] | null) {
    const locale = option && !Array.isArray(option) ? (option.value as Locale) : routing.defaultLocale;
    startTransition(() => {
      router.replace({ pathname, ...(params ? { params } : {}) }, { locale });
    });
  }

  return (
    <Select
      value={value}
      className={styles.locale}
      options={options}
      onChange={onSelectChange}
      disabled={isPending}
      required
      searchable
      itemHeight={40}
    />
  );
};
