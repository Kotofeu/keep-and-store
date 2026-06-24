import { FC } from 'react';
import { LanguageSwitcher } from '@features/language-switcher';
import { ThemeModeSwitcher } from '@features/theme-mode-switcher';
import { ThemeStyleSwitcher } from '@features/theme-style-switcher';
import { Link } from '@shared/i18n/routing';
import { cn } from '@shared/utils/cn';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        className,
        'bg-header-bg border-header-border text-foreground h-header flex w-full items-center border-b px-3.5'
      )}
    >
      <div className="flex w-full items-center gap-8">
        <div className="flex-1">
          <Link href={'/'}>Logo</Link>
        </div>
        <nav className="flex-none text-sm font-medium">
          <div className="flex flex-wrap items-center gap-6">
            <Link href={'/'}>Главная</Link>
            <Link href={'/test/icons'}>Иконки</Link>
            <Link href={'/'}>Услуги</Link>
            <Link href={'/'}>Контакты</Link>
          </div>
        </nav>

        <div className="flex flex-6 items-center justify-end gap-2">
          <ThemeStyleSwitcher />
          <ThemeModeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
