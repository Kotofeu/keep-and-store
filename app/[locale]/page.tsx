import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use, type FC } from 'react';

import { type Locale } from '@shared/i18n';

const HomePage: FC<PageProps<'/[locale]'>> = ({ params }) => {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('MainPage');

  return <h1>{t('dmode')}</h1>;
};

export default HomePage;
