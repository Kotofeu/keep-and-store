import { FC } from 'react';
import { LanguageSwitcher } from '@features/language-switcher';
import { ThemeSwitcher } from '@features/theme-switcher';
import { cn } from '@shared/utils/cn';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(
        className,
        'z-header bg-header-bg border-header-border text-foreground fixed top-0 right-0 left-0 border-b'
      )}
    >
      <div className="container-fluid">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <a href="#" className="">
              Logo
            </a>
          </div>
          <nav className="flex-none text-sm font-medium">
            <div className="flex items-center gap-6">
              <a href="#">Главная</a>
              <a href="#">О нас</a>
              <a href="#">Услуги</a>
              <a href="#">Контакты</a>
            </div>
          </nav>

          <div className="flex flex-6 items-center justify-end gap-4">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
