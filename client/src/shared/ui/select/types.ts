import { ReactNode } from 'react';

export type Option<T = undefined> = {
  value: string;
  label: string;
  icon?: ReactNode;
} & (undefined extends T ? { data?: T } : { data: T });

export interface SelectRef {
  readonly value: string;
}

export type SelectValue<
  T,
  // Multiple extends boolean = false
  Multiple extends boolean,
  // Clearable extends boolean = true
  Clearable extends boolean
> = Multiple extends true
  ? Clearable extends true
    ? Option<T>[] | null
    : Option<T>[]
  : Clearable extends true
    ? Option<T> | null
    : Option<T>;

export interface SelectProps<
  T,
  // true => []
  Multiple extends boolean = false,
  // true => nullable
  Clearable extends boolean = true
> {
  options?: Option<T>[];
  loadOptions?: () => Promise<Option<T>[]>;
  value?: SelectValue<T, Multiple, Clearable>;
  defaultValue?: SelectValue<T, Multiple, Clearable>;
  onChange?: (value: SelectValue<T, Multiple, Clearable>) => void;
  multiple?: Multiple;
  clearable?: Clearable;
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
}
