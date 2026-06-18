'use client';

import { useCallback, useState, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useKeyboardNavigation } from '@shared/hooks/useKeyboardNavigation';
import { LOCALES, LOCALE_NAMES, Locale, usePathname, useRouter } from '@shared/i18n/routing';
import { PopoverButton } from '@shared/ui/button-popover';
import { Icon } from '@shared/ui/icon';

const localesItems = Array.from(LOCALES);

export const LanguageSwitcher = () => {
  const t = useTranslations('locale');

  const currentLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeIndex, setActiveIndex] = useState(-1);

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

  const { handleKeyDown, getItemProps, setFirst, reset } = useKeyboardNavigation({
    disabled: isPending,
    items: localesItems,
    activeIndex,
    isLoop: true,
    onSelect: handleLocaleChange,
    setActiveIndex,
    isItemDisabled: (locale) => locale === currentLocale
  });

  return (
    <PopoverButton
      icon={currentLocale}
      className="bg-bg cursor-pointer rounded-full border border-transparent p-1 transition-colors"
      activeClassName="border-input-border"
      disabled={isPending}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFirst();
        }
      }}
      onClose={reset}
      aria-label={t('currentLocale', { locale: LOCALE_NAMES[currentLocale] })}
    >
      <ul role="listbox" aria-label={t('localeList')} onKeyDown={handleKeyDown} className="flex flex-col gap-1.5">
        {LOCALES.map((locale, index) => {
          const isActive = locale === currentLocale;
          const itemProps = getItemProps(index);

          return (
            <li
              key={locale}
              role="option"
              aria-selected={isActive}
              aria-disabled={isPending}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium transition-colors ${
                isActive
                  ? 'bg-button-primary-bg text-button-primary-text cursor-default'
                  : 'border-button-secondary-border hover:bg-button-secondary-bg-hover text-button-secondary-text cursor-pointer border'
              }`}
              {...itemProps}
            >
              <Icon type={locale} className="bg-bg border-bg rounded-full border-3" />
              {LOCALE_NAMES[locale]}
            </li>
          );
        })}
      </ul>
    </PopoverButton>
  );
};
