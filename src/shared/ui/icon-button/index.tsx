import { ButtonHTMLAttributes, FC } from 'react';

import { Icon, IconType } from '@/shared/ui/icon';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  color?: string;
}

export const IconButton: FC<IconButtonProps> = ({ className, icon, color, ...otherProps }) => (
  <button className={classNames(styles.button, {}, [className])} type='button' {...otherProps}>
    <Icon className={styles.button__icon} type={icon} color={color} aria-hidden />
  </button>
);
