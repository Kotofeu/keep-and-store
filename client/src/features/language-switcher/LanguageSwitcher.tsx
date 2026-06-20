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
      title={t('switchLocale')}
      icon={currentLocale}
      className="bg-bg hover:border-input-border-hover h-8.5 w-8.5 cursor-pointer rounded-full border border-transparent p-1 transition-colors"
      activeClassName="border-input-border hover:border-input-border"
      disabled={isPending}
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFirst();
        }
      }}
      onClose={reset}
    >
      <ul role="listbox" aria-label={t('localeList')} onKeyDown={handleKeyDown} className="flex flex-col gap-1">
        {LOCALES.map((locale, index) => {
          const isActive = locale === currentLocale;
          const itemProps = getItemProps(index);

          return (
            <li
              key={locale}
              role="option"
              aria-selected={isActive}
              aria-disabled={isPending}
              aria-label={LOCALE_NAMES[locale]}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium transition-colors ${
                isActive
                  ? 'bg-input-option-bg-selected text-input-option-text-selected cursor-default'
                  : 'hover:bg-input-option-bg-hover hover:text-input-option-text-hover cursor-pointer'
              }`}
              {...itemProps}
            >
              <Icon className="bg-icon-primary rounded-full" type={locale} />
              {LOCALE_NAMES[locale]}
            </li>
          );
        })}
      </ul>
    </PopoverButton>
  );
};
