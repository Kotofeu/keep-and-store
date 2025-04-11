import { FC, use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/shared/i18n';
import { BasePageProps } from '@/shared/types';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { Select } from '@/shared/ui/select';
import { Select as Wow } from '@/shared/ui/wow-select';
import { Tooltip } from '@/shared/ui/tooltip';

import { loadTestOptions } from './testLoading';

const HomePage: FC<BasePageProps> = ({ params }) => {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('MainPage');
  return (
    <main>
      <Select loadOptions={loadTestOptions} placeholder='Селектор' searchable multiple />
      <Select
        options={[
          { label: '1', value: '1', disabled: true },
          { label: '2', value: '3' },
          { label: '3', value: '4' }
        ]}
        placeholder='Селектор'
        multiple
      />
      <Select options={[{ label: '1', value: '1' }]} placeholder='Селектор' searchable />
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
      <Wow loadOptions={loadTestOptions} placeholder='Селектор' searchable multiple />
      <Wow
        options={[
          { label: '1', value: '1', disabled: true },
          { label: '2', value: '3' },
          { label: '3', value: '4' }
        ]}
        placeholder='Селектор'
        multiple
      />
      <Wow options={[{ label: '1', value: '1' }]} placeholder='Селектор' searchable />

      <Tooltip content='Большоооооооооооооооооооооооооой туууултипп' position='auto'>
        <div style={{ width: 20, height: 20, backgroundColor: 'red' }}></div>
      </Tooltip>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Tooltip content='Большоооооооооооооооооооооооооой туууултипп' position='auto'>
          <div style={{ width: 20, height: 20, backgroundColor: 'red' }}></div>
        </Tooltip>
        <br />
      </div>

      <Tooltip content={<span>sdfsdf</span>} position='auto'>
        <div style={{ width: 400, height: 20, backgroundColor: 'red' }}></div>
      </Tooltip>
      <br />
    </main>
  );
};

export default HomePage;
