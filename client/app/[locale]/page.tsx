import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { LanguageSwitcher } from '@features/language-switcher';
import { Test } from '@features/test';
import { ThemeSwitcher } from '@features/theme-switcher';
import { Locale } from '@shared/i18n/routing';

const Home = (props: PageProps<'/[locale]'>) => {
  const { params } = props;
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations();

  return (
    <main className="p-8">
      <h1 className="text-4xl">{t('Home')}</h1>
      <div className="mt-10 flex gap-6">
        <Test />
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </main>
  );
};

export default Home;
