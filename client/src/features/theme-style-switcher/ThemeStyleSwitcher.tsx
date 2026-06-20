'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAppTheme } from '@shared/hooks/useAppTheme';
import { useIsMounted } from '@shared/hooks/useIsMounted';
import { useKeyboardNavigation } from '@shared/hooks/useKeyboardNavigation';
import { StyleTheme, StyleThemeEnum } from '@shared/types/theme';
import { PopoverButton } from '@shared/ui/button-popover';
import { cn } from '@shared/utils/cn';
import { ColorPalette } from './color-palette';

interface ThemeStyleSwitcherProps {
  className?: string;
}

const styleItems: StyleTheme[] = [StyleThemeEnum.NOTEPAD, StyleThemeEnum.STANDARD];

const getColorClasses = (style: string, isDark: boolean) => {
  const mode = isDark ? 'dark' : 'light';

  return {
    color1: `bg-${style}-${mode}-1`,
    color2: `bg-${style}-${mode}-2`
  };
};

export const ThemeStyleSwitcher: FC<ThemeStyleSwitcherProps> = ({ className }) => {
  const t = useTranslations('theme');
  const isMounted = useIsMounted();
  const { styleTheme, setStyleTheme, isDark } = useAppTheme();
  const [activeIndex, setActiveIndex] = useState(-1);

  const styleLabels = useMemo(
    () => ({
      [StyleThemeEnum.NOTEPAD]: t('notepad'),
      [StyleThemeEnum.STANDARD]: t('standard')
    }),
    [t]
  );

  const handleStyleChange = useCallback(
    (newStyle: StyleTheme) => {
      if (newStyle === styleTheme) {
        return;
      }
      setStyleTheme(newStyle);
    },
    [styleTheme, setStyleTheme]
  );

  const { handleKeyDown, getItemProps, setFirst, reset } = useKeyboardNavigation({
    disabled: false,
    items: styleItems,
    activeIndex,
    isLoop: true,
    onSelect: handleStyleChange,
    setActiveIndex,
    isItemDisabled: (style) => style === styleTheme
  });

  if (!isMounted) {
    return <span className="bg-bg h-8.5 w-8.5 rounded-full border border-transparent" aria-hidden />;
  }

  const activeColors = getColorClasses(styleTheme, isDark);

  return (
    /* Generate tailwind classes
      bg-notepad-light-1 bg-notepad-light-2
      bg-notepad-dark-1 bg-notepad-dark-2
      bg-standard-light-1 bg-standard-light-2 
      bg-standard-dark-1 bg-standard-dark-2 
    */

    <PopoverButton
      title={t('switchStyle')}
      className={cn(
        'bg-bg hover:border-input-border-hover flex h-8.5 w-8.5 cursor-pointer rounded-full border border-transparent p-1 transition-colors',
        className
      )}
      activeClassName="border-input-border hover:border-input-border"
      customButton={
        <button>
          <ColorPalette className="bg-icon-primary h-6 w-6" colorsClass={[activeColors.color1, activeColors.color2]} />
        </button>
      }
      onKeyDown={(e) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setFirst();
        }
      }}
      onClose={reset}
    >
      <ul role="listbox" aria-label={t('styleList')} onKeyDown={handleKeyDown} className="flex flex-col gap-1">
        {styleItems.map((style, index) => {
          const isActive = style === styleTheme;
          const itemProps = getItemProps(index);
          const colors = getColorClasses(style, isDark);

          return (
            <li
              key={style}
              role="option"
              aria-selected={isActive}
              aria-label={styleLabels[style]}
              className={`flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium transition-colors ${
                isActive
                  ? 'bg-input-option-bg-selected text-input-option-text-selected cursor-default'
                  : 'hover:bg-input-option-bg-hover hover:text-input-option-text-hover cursor-pointer'
              }`}
              {...itemProps}
            >
              <ColorPalette className="bg-icon-primary h-6 w-6" colorsClass={[colors.color1, colors.color2]} />
              {styleLabels[style]}
            </li>
          );
        })}
      </ul>
    </PopoverButton>
  );
};
