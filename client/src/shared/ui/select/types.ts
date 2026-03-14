import { ReactNode } from 'react';

export type Option<T = undefined> = {
  value: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
} & (undefined extends T ? { data?: T } : { data: T });

type SingleValue<T, Clearable extends boolean> = Clearable extends true ? Option<T> | null : Option<T>;

type MultiValue<T, Clearable extends boolean> = Clearable extends true ? Option<T>[] | null : Option<T>[];

export type SelectValue<T, Multiple extends boolean, Clearable extends boolean> = Multiple extends true
  ? MultiValue<T, Clearable>
  : SingleValue<T, Clearable>;

type ControlledProps<T, Multiple extends boolean, Clearable extends boolean> = {
  value: SelectValue<T, Multiple, Clearable>;
};

type UncontrolledProps<T, Multiple extends boolean, Clearable extends boolean> = Clearable extends true
  ? { defaultValue?: SelectValue<T, Multiple, Clearable> }
  : { defaultValue: SelectValue<T, Multiple, Clearable> };

export type SelectProps<T, Multiple extends boolean = false, Clearable extends boolean = true> = {
  className?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string | boolean;
  multiple?: Multiple;
  clearable?: Clearable;
  disabled?: boolean;
  options?: Option<T>[];
  loadOptions?: () => Promise<Option<T>[]>;
  onChange?: (value: SelectValue<T, Multiple, Clearable>) => void;
} & (ControlledProps<T, Multiple, Clearable> | UncontrolledProps<T, Multiple, Clearable>);

export interface SelectRef<T = unknown, Multiple extends boolean = false, Clearable extends boolean = true> {
  readonly value: SelectValue<T, Multiple, Clearable>;
  open: () => void;
  close: () => void;
}
