import { FC, HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib';

import { ClientTooltip } from './tooltip-client';
import styles from './styles.module.scss';

interface TooltipWrapperProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  className?: string;
  content: ReactNode;
  position?: 'top' | 'left' | 'bottom' | 'right' | 'auto';
  backgroundColor?: string;
  color?: string;
  maxWidth?: number;
  maxHeight?: number;
  offset?: number;
  children: ReactNode;
}

export const Tooltip: FC<TooltipWrapperProps> = ({
  className,
  content,
  position = 'auto',
  backgroundColor = 'var(--color-black)',
  color = 'var(--tooltip-color)',
  maxWidth = 250,
  maxHeight = 200,
  offset = 10,
  children,
  ...otherProps
}) => (
  <div className={classNames(styles.container, {}, [className])} {...otherProps}>
    {children}
    <ClientTooltip
      content={content}
      position={position}
      backgroundColor={backgroundColor}
      color={color}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      offset={offset}
    />
  </div>
);
