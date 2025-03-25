import { FC, use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/shared/i18n';
import { BasePageProps } from '@/shared/types';
import { ThemeSwitcher } from '@/features/theme-switcher';
import { Option, Select } from '@/shared/ui/select';
import { Tooltip } from '@/shared/ui/tooltip';

const HomePage: FC<BasePageProps> = ({ params }) => {
  const { locale } = use(params);
  setRequestLocale(locale);
  const loadTestOptions = async (): Promise<Option<string>[]> => {
    'use server';
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // Пример условия для ошибки
          const shouldThrowError = Math.random() > 1; // 20% chance to throw an error
          if (shouldThrowError) {
            throw new Error('Произошла ошибка при загрузке опций');
          }

          const options: Option<string>[] = Array.from({ length: 10000 }, (_, index) => ({
            value: `${index}`,
            label: `Option ${index}`
          }));
          resolve(options);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  };
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
        searchable
        multiple
      />
      <Select options={[{ label: '1', value: '1' }]} placeholder='Селектор' searchable multiple />
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
