'use client';

import { useLocale } from 'next-intl';
import { useCallback, useTransition } from 'react';
import {
  LOCALES,
  LOCALE_NAMES,
  Locale,
  usePathname,
  useRouter
} from '@shared/i18n/routing';

export const LanguageSwitcher = () => {
  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = useCallback(
    (newLocale: Locale) => {
      if (newLocale === currentLocale) {
        return;
      }

      startTransition(() => {
        router.replace(pathname, { locale: newLocale });
      });
    },
    [currentLocale, pathname, router]
  );

  return (
    <div
      className={`border-button-secondary-border bg-background inline-flex rounded-3xl border p-1 shadow-sm`}
      role="group"
      aria-label="Переключатель языка"
    >
      {LOCALES.map((locale) => {
        const isActive = locale === currentLocale;

        return (
          <button
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            disabled={isPending}
            aria-pressed={isActive}
            className={`flex items-center gap-3 rounded-2xl px-6 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.985] ${
              isActive
                ? 'bg-button-primary-bg text-button-primary-text shadow'
                : `text-button-secondary-text hover:bg-button-secondary-hover-bg hover:text-button-secondary-hover-text`
            } `}
          >
            <span className="tracking-wide">{LOCALE_NAMES[locale]}</span>
          </button>
        );
      })}
    </div>
  );
};
