'use client';

import { createContext, useContext, Context } from 'react';

import { ContextValues } from '../types';

const SelectContext = createContext<ContextValues<any> | undefined>(undefined);

export function useSelectContext<T>() {
  const context = useContext(SelectContext as Context<ContextValues<T>>);
  if (!context) {
    throw new Error('useSelectContext must be used within a SelectProvider');
  }
  return context;
}

export default SelectContext;
