/* eslint-disable react/jsx-key */
import { FC, HTMLAttributes, JSX } from 'react';

import { classNames } from '@/shared/lib';

import styles from './styles.module.scss';
import {
  ArrowDown,
  CnFlag,
  Cross,
  DarkMode,
  DeFlag,
  Error,
  InFlag,
  LightMode,
  RuFlag,
  SaFlag,
  SpMxFlag,
  Success,
  SystemMode,
  UkUsFlag,
  Warning
} from './assents';

export type IconType =
  | 'none'
  | 'cross'
  | 'arrowDown'
  | 'error'
  | 'success'
  | 'warning'
  | 'lightMode'
  | 'darkMode'
  | 'systemMode'
  | 'ru'
  | 'en'
  | 'es'
  | 'hi'
  | 'sa'
  | 'zh'
  | 'de';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  type: IconType;
  color?: string;
  title?: string;
}

const getIcons = (color?: string) =>
  new Map<IconType, JSX.Element>([
    ['none', <></>],

    // system icons
    ['cross', <Cross color={color} />],
    ['arrowDown', <ArrowDown color={color} />],

    // status icons
    ['error', <Error color={color} />],
    ['warning', <Warning color={color} />],
    ['success', <Success color={color} />],

    // themes icons
    ['lightMode', <LightMode color={color} />],
    ['darkMode', <DarkMode color={color} />],
    ['systemMode', <SystemMode color={color} />],

    // flag icons
    ['ru', <RuFlag color={color} />],
    ['en', <UkUsFlag color={color} />],
    ['es', <SpMxFlag color={color} />],
    ['hi', <InFlag color={color} />],
    ['sa', <SaFlag color={color} />],
    ['zh', <CnFlag color={color} />],
    ['de', <DeFlag color={color} />]
  ]);

export const Icon: FC<IconProps> = ({ className, type, color, ...otherProps }) => {
  const getIcon = (type: IconType) => getIcons(color).get(type);

  return (
    <div className={classNames(styles.container, {}, [className])} {...otherProps}>
      {getIcon(type)}
    </div>
  );
};
