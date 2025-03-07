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
  | 'cross'
  | 'arrowDown'
  | 'error'
  | 'success'
  | 'warming'
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
}

const getIcons = (color?: string) =>
  new Map<IconType, JSX.Element>([
    // system icons
    ['cross', <Cross color={color} />],
    ['arrowDown', <ArrowDown color={color} />],

    // status icons
    ['error', <Error color={color} />],
    ['warming', <Warning color={color} />],
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

export const Icon: FC<IconProps> = ({ type, className, color, ...rest }) => {
  const getIcon = (type: IconType) => getIcons(color).get(type);

  return (
    <div className={classNames(styles.container, {}, [className])} {...rest}>
      {getIcon(type)}
    </div>
  );
};
