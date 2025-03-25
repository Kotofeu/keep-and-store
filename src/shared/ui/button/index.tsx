import { ButtonHTMLAttributes, FC } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

export type ButtonThemes = 'primary' | 'secondary' | 'clear';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme?: ButtonThemes;
}

export const Button: FC<ButtonProps> = ({ className, theme = 'primary', children, type = 'button', ...otherProps }) => (
  <button
    {...otherProps}
    className={classNames(styles.button, {}, [className, styles[theme]])}
    type={type}
    role='button'
  >
    {children}
  </button>
);
