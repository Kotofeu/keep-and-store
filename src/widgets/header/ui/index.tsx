import { FC } from 'react';

import { LocaleSwitcher } from '@/features/locale-switcher';
import { ThemeSwitcher } from '@/features/theme-switcher';

import styles from './styles.module.scss';

export const Header: FC = () => (
  <header className={styles.header}>
    <div className={styles.header__wrapper}>
      <div className={styles.header__switchers}>
        <LocaleSwitcher />
        <ThemeSwitcher />
      </div>
      <div></div>
      <nav></nav>
    </div>
  </header>
);
