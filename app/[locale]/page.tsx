import { FC, use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/shared/i18n';
import { BasePageProps } from '@/shared/types';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { Select } from '@/shared/ui/select';

const HomePage: FC<BasePageProps> = ({ params }) => {
  const { locale } = use(params);
  setRequestLocale(locale);

  const t = useTranslations('MainPage');
  return (
    <main>
      <Select
        options={[
          { value: '1', label: 'Value 1' },
          { value: '2', label: 'Value 2' },
          { value: '3', label: 'Value 3' }
        ]}
        value={[
          { value: '1', label: 'Value 1' },
          { value: '2', label: 'Value 2' },
          { value: '3', label: 'Value 3' }
        ]}
        placeholder='Селектор'
        searchable
        multiple
        disabled
      />
      <Link href={'/about'}>ABOUT</Link>
      <Link href={'/'} locale={'ru'}>
        RU
      </Link>
      <Link href={'/'} locale={'en'}>
        EN
      </Link>
      <Link href={'/'} locale='ru'>
        Ru
      </Link>
      <Link href={'/'} locale='en'>
        En
      </Link>
      {t('a')}
      <ThemeSwitcher />
    </main>
  );
};

export default HomePage;
