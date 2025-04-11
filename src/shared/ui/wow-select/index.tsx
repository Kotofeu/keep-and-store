import { useId } from 'react';

import { SelectProvider } from './select-provider/provider';
import { SelectProps } from './types';
import { SelectContainer } from './select-container';

export const Select = <T,>({ className, placeholder, ...props }: SelectProps<T>) => {
  const randomId = useId();
  return (
    <SelectProvider<T> {...props} id={randomId}>
      <SelectContainer className={className} placeholder={placeholder} />
    </SelectProvider>
  );
};
