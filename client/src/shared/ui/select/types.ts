import { ReactNode } from 'react';

export interface Option<T = unknown> {
  value: string;
  label: string;
  icon?: ReactNode;
  data: T;
}

export type SelectValue<T = unknown> = Option<T> | Option<T>[] | null;
