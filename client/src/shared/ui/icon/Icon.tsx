/* eslint-disable react/jsx-key */
import { FC, HTMLAttributes, JSX } from 'react';
import { cn } from '@shared/utils/cn';
import { ArrowDown, Cross, DarkMode, Error, LightMode, RuFlag, Success, UkUsFlag, Warning } from './assets';

export const ICON_TYPES = [
  'none',
  'cross',
  'arrowDown',
  'error',
  'success',
  'warning',
  'lightMode',
  'darkMode',
  'ru',
  'en'
] as const;

export type IconType = (typeof ICON_TYPES)[number];

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  iconClassName?: string;
  type: IconType;
  title?: string;
}

const getIcons = (className?: string) =>
  new Map<IconType, JSX.Element>([
    ['none', <></>],

    // system icons
    ['cross', <Cross className={className} />],
    ['arrowDown', <ArrowDown className={className} />],

    // status icons
    ['error', <Error className={className} />],
    ['warning', <Warning className={className} />],
    ['success', <Success className={className} />],

    // themes icons
    // mode
    ['lightMode', <LightMode className={className} />],
    ['darkMode', <DarkMode className={className} />],

    // flag icons
    ['ru', <RuFlag className={className} />],
    ['en', <UkUsFlag className={className} />]
  ]);

export const Icon: FC<IconProps> = ({ className, type, iconClassName, ...otherProps }) => {
  const getIcon = (type: IconType) => getIcons(iconClassName).get(type);

  return (
    <div
      className={cn(
        'flex [&>svg]:block [&>svg]:h-full [&>svg]:w-full [&>svg]:object-contain [&>svg]:transition-[stroke,fill] [&>svg]:duration-150 [&>svg]:ease-in-out',
        className
      )}
      {...otherProps}
    >
      {getIcon(type)}
    </div>
  );
};
