import { use } from 'react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Test } from '@features/test';
import { Locale } from '@shared/i18n/routing';

const Home = (props: PageProps<'/[locale]'>) => {
  const { params } = props;
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations();
  return (
    <div>
      <h1 className="text-4xl">{t('Home')}</h1>
      <Test />
    </div>
  );
};

export default Home;
