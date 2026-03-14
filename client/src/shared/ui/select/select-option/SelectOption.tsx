import { type LiHTMLAttributes } from 'react';
import { cn } from '@shared/utils/cn';
import { Option } from '../types';

interface SelectOptionProps<T> extends LiHTMLAttributes<HTMLLIElement> {
  option: Option<T>;
  selected: boolean;
  multiple: boolean;
  disabled?: boolean;
}

export const SelectOption = <T,>({
  option,
  selected,
  multiple,
  disabled,
  className,
  ...props
}: SelectOptionProps<T>) => (
  <li
    className={cn(
      'hover:bg-input-border-hover flex cursor-pointer items-center gap-3 px-4 py-2.5 transition-colors',
      disabled && 'text-input-option-disabled-text cursor-not-allowed',
      className
    )}
    {...props}
  >
    {option.icon && <span className="text-base">{option.icon}</span>}
    <span className="flex-1">{option.label}</span>
    {multiple && selected && <span className="text-green-600">✓</span>}
  </li>
);
