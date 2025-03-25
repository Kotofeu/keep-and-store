'use client';
import { FC, useState } from 'react';

import { Icon, IconType } from '@/shared/ui/icon';
import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';

interface IconButtonProps {
  className?: string;
  title?: string;
  ariaLabel?: string;
  icon: IconType;
  color?: string;
  isActive?: boolean;
  activeColor?: string;
  hoverColor?: string;
  onClick: () => void;
}

export const IconButton: FC<IconButtonProps> = ({
  className,
  title,
  ariaLabel,
  icon,
  color,
  isActive = false,
  activeColor,
  hoverColor,
  onClick
}) => {
  const [isHover, setIsHover] = useState(false);

  const getIconColor = () => {
    if (isActive && activeColor) {
      return activeColor;
    }
    if (isHover && hoverColor) {
      return hoverColor;
    }
    return color;
  };

  return (
    <button
      className={classNames(
        styles.button,
        {
          [styles.button_active]: isActive,
          [styles.button_hover]: isHover
        },
        [className]
      )}
      onClick={onClick}
      type='button'
      title={title}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHover(!isActive)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Icon className={styles.button__icon} type={icon} color={getIconColor()} aria-hidden />
    </button>
  );
};
