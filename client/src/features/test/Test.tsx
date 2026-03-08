'use client';

import { useState } from 'react';
import { Option, Select, SelectValue } from '@shared/ui/select';

const options: Option<number>[] = [
  { value: 'apple', label: 'Яблоко', icon: '🍎', data: 1 },
  { value: '1', label: '1', icon: '🍎', data: 1 },
  { value: '2', label: '2', icon: '🍎', data: 1 },
  { value: '3', label: '3', icon: '🍎', data: 1 }
];

export const Test = () => {
  const [selected, setSelected] = useState<SelectValue<number>>(null);

  return (
    <div>
      <Select
        options={options}
        value={selected}
        onChange={setSelected}
        isMultiple
        isSearchable
        isClearable
        placeholder="Выберите фрукты"
      />
    </div>
  );
};
