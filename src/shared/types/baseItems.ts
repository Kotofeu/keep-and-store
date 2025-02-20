import { ReactNode } from 'react';

export interface Option {
  value: string;
  label: string;
  ui?: ReactNode;
}
