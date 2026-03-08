'use client';

import { Option } from '../types';

interface SelectOptionProps<T> {
  option: Option<T>;
  isSelected: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const SelectOption = <T,>({
  option,
  isSelected,
  isActive,
  onClick
}: SelectOptionProps<T>) => (
  <li
    id={`select-option-${option.value}`}
    role="option"
    aria-selected={isSelected}
    onClick={onClick}
    className={`mx-3 my-1 flex cursor-pointer items-center gap-3 rounded-3xl px-5 py-3.5 transition-all ${isActive ? 'bg-foreground/10 scale-[1.02]' : 'hover:bg-foreground/5'} `}
  >
    {option.icon && <span className="text-2xl">{option.icon}</span>}
    <span className="text-foreground flex-1 font-medium">{option.label}</span>

    {isSelected && (
      <div className="bg-accent text-accent-foreground flex h-6 w-6 items-center justify-center rounded-full text-sm">
        ✓
      </div>
    )}
  </li>
);
