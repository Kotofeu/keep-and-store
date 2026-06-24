import { ForwardedRef, HTMLAttributes, JSX } from 'react';
import { IconType } from '@shared/ui/icon';

export type Option<T = undefined> = {
  value: string;
  label: string;
  icon?: IconType;
  disabled?: boolean;
} & (undefined extends T ? { data?: T } : { data: T });

interface BaseSelectProps<T> extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'value' | 'onChange' | 'defaultValue' | 'children'
> {
  // base
  className?: string;
  disabled?: boolean;
  error?: string | boolean;
  isLoading?: boolean;
  isInstantLoad?: boolean;
  searchable?: boolean;
  options?: Option<T>[];
  // text
  placeholder?: string;
  searchPlaceholder?: string;
  loadingText?: string;
  noResultsText?: string;
  clearAriaLabel?: string;
  removeAriaLabel?: string;
  loadErrorMessage?: string;
  ariaLabel?: string;
  // func
  loadOptions?: () => Promise<Option<T>[]>;
}

interface SingleClearableControlled<T> extends BaseSelectProps<T> {
  multiple?: false;
  clearable: true;
  value?: Option<T> | null;
  defaultValue?: never;
  onChange?: (value: Option<T> | null) => void;
}

interface SingleClearableUncontrolled<T> extends BaseSelectProps<T> {
  multiple?: false;
  clearable: true;
  value?: never;
  defaultValue?: Option<T> | null;
  onChange?: (value: Option<T> | null) => void;
}

interface SingleNonClearableControlled<T> extends BaseSelectProps<T> {
  multiple?: false;
  clearable?: false;
  value: Option<T>;
  defaultValue?: never;
  onChange?: (value: Option<T>) => void;
}

interface SingleNonClearableUncontrolled<T> extends BaseSelectProps<T> {
  multiple?: false;
  clearable?: false;
  value?: never;
  defaultValue?: Option<T>;
  onChange?: (value: Option<T>) => void;
}

interface MultiClearableControlled<T> extends BaseSelectProps<T> {
  multiple: true;
  clearable: true;
  value?: Option<T>[] | null;
  defaultValue?: never;
  onChange?: (value: Option<T>[] | null) => void;
}

interface MultiClearableUncontrolled<T> extends BaseSelectProps<T> {
  multiple: true;
  clearable: true;
  value?: never;
  defaultValue?: Option<T>[] | null;
  onChange?: (value: Option<T>[] | null) => void;
}

interface MultiNonClearableControlled<T> extends BaseSelectProps<T> {
  multiple: true;
  clearable?: false;
  value: Option<T>[];
  defaultValue?: never;
  onChange?: (value: Option<T>[]) => void;
}

interface MultiNonClearableUncontrolled<T> extends BaseSelectProps<T> {
  multiple: true;
  clearable?: false;
  value?: never;
  defaultValue?: Option<T>[];
  onChange?: (value: Option<T>[]) => void;
}

export type SingleClearableSelectProps<T> = SingleClearableControlled<T> | SingleClearableUncontrolled<T>;

export type SingleNonClearableSelectProps<T> = SingleNonClearableControlled<T> | SingleNonClearableUncontrolled<T>;

export type MultiClearableSelectProps<T> = MultiClearableControlled<T> | MultiClearableUncontrolled<T>;

export type MultiNonClearableSelectProps<T> = MultiNonClearableControlled<T> | MultiNonClearableUncontrolled<T>;

export type SelectProps<T = undefined> =
  | SingleClearableSelectProps<T>
  | SingleNonClearableSelectProps<T>
  | MultiClearableSelectProps<T>
  | MultiNonClearableSelectProps<T>;

export type SelectValue<T> = Option<T> | Option<T>[] | null | undefined;

export type SelectRef<T = undefined> = {
  readonly element: HTMLDivElement | null;
  readonly value: SelectValue<T>;
  open: () => void;
  close: () => void;
};

export type SelectComponent = {
  <T>(props: SingleClearableSelectProps<T> & { ref?: ForwardedRef<SelectRef<T>> }): JSX.Element;
  <T>(props: SingleNonClearableSelectProps<T> & { ref?: ForwardedRef<SelectRef<T>> }): JSX.Element;
  <T>(props: MultiClearableSelectProps<T> & { ref?: ForwardedRef<SelectRef<T>> }): JSX.Element;
  <T>(props: MultiNonClearableSelectProps<T> & { ref?: ForwardedRef<SelectRef<T>> }): JSX.Element;
  displayName?: string;
};
