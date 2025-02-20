/* eslint-disable react/jsx-key */
import { FC, HTMLAttributes, JSX } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import {
  CnFlag,
  Cross,
  DarkMode,
  DeFlag,
  InFlag,
  LightMode,
  RuFlag,
  SaFlag,
  SpMxFlag,
  SystemMode,
  UkUsFlag
} from './icons-assets';

export type IconType =
  | 'cross'
  | 'lightMode'
  | 'darkMode'
  | 'systemMode'
  | 'ru'
  | 'en'
  | 'es'
  | 'in'
  | 'sa'
  | 'cn'
  | 'de';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type: IconType;
  color?: string;
}

const getIcons = (color?: string) =>
  new Map<IconType, JSX.Element>([
    // system icon
    ['cross', <Cross color={color} />],
    // themes icons
    ['lightMode', <LightMode color={color} />],
    ['darkMode', <DarkMode color={color} />],
    ['systemMode', <SystemMode color={color} />],

    // flag icons
    ['ru', <RuFlag color={color} />],
    ['en', <UkUsFlag color={color} />],
    ['es', <SpMxFlag color={color} />],
    ['in', <InFlag color={color} />],
    ['sa', <SaFlag color={color} />],
    ['cn', <CnFlag color={color} />],
    ['de', <DeFlag color={color} />]
  ]);

export const Icon: FC<IconProps> = ({ type, className, color, ...rest }) => {
  const getIcon = (type: IconType) => getIcons(color).get(type);

  return (
    <div className={classNames(styles.container, {}, [className])} {...rest}>
      {getIcon(type)}
    </div>
  );
};
