'use client';

import { useRef, useState } from 'react';
import { Option, Select } from '@shared/ui/select';

interface User {
  id: number;
  role: string;
}

const users: Option<User>[] = [
  { value: '1', label: 'Alice Johnson', data: { id: 1, role: 'admin' } },
  { value: '2', label: 'Bob Smith', data: { id: 2, role: 'user' } },
  { value: '3', label: 'Charlie Brown', data: { id: 3, role: 'moderator' } },
  { value: '4', label: 'Diana Prince', data: { id: 4, role: 'admin' } }
];

const fruits: Option[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' }
];

export const Test = () => {
  const [singleValue, setSingleValue] = useState<Option<User> | null>(users[0]);

  const [singleClearableFalse, setSingleClearableFalse] = useState<Option<User>>(users[1]);

  const [multiValue, setMultiValue] = useState<Option<User>[] | null>([users[0], users[2]]);

  const [multiClearableFalse, setMultiClearableFalse] = useState<Option<User>[]>([users[1]]);

  const [fruitsValue, setFruitsValue] = useState<Option | null>(null);

  const [multiFruitsValue, setMultiFruitsValue] = useState<Option[] | null>(null);

  const loadFruitsAsync = async (): Promise<Option[]> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return fruits;
  };

  const ref = useRef(null);

  return (
    <div className="container mx-auto space-y-10 p-8">
      <h1 className="mb-6 text-3xl font-bold">Select Component Variants</h1>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">1. Single select (clearable = true, default)</h2>
        <div className="w-80">
          <Select
            options={users}
            value={singleValue}
            onChange={setSingleValue}
            placeholder="Choose a user"
            searchPlaceholder="Search users..."
          />
        </div>
        <p className="text-sm text-gray-500">Selected: {singleValue?.label ?? 'none'}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">2. Single select (clearable = false)</h2>
        <div className="w-80">
          <Select
            options={users}
            value={singleClearableFalse}
            onChange={setSingleClearableFalse}
            clearable={false}
            placeholder="Choose a user"
          />
        </div>
        <p className="text-sm text-gray-500">Selected: {singleClearableFalse.label}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">3. Async loading (single)</h2>
        <div className="w-80">
          <Select
            loadOptions={loadFruitsAsync}
            value={fruitsValue}
            onChange={setFruitsValue}
            placeholder="Load fruits..."
            searchPlaceholder="Search fruit"
          />
        </div>
        <p className="text-sm text-gray-500">Selected: {fruitsValue?.label ?? 'none'}</p>
      </section>

      <section className="space-y-2">
        <h2 className="text-xl font-semibold">4. Multi select (clearable = true, default)</h2>
        <div className="w-96">
          <Select
            multiple
            options={users}
            value={multiValue}
            onChange={setMultiValue}
            placeholder="Select users"
            searchPlaceholder="Search..."
          />
        </div>
        <p className="text-sm text-gray-500">Selected: {multiValue?.map((v) => v.label).join(', ') ?? 'none'}</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">5. Multi select (clearable = false)</h2>
        <div className="w-96">
          <Select
            multiple
            clearable={false}
            options={users}
            value={multiClearableFalse}
            onChange={setMultiClearableFalse} // ✅ accepts only Option<User>[]
            placeholder="Select users"
          />
        </div>
        <p className="text-sm text-gray-500">Selected: {multiClearableFalse.map((v) => v.label).join(', ')}</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">6. Multi select – chip removal demo</h2>
        <div className="w-96">
          <Select multiple options={users} value={multiValue} onChange={setMultiValue} placeholder="Select users" />
        </div>
        <p className="text-sm text-gray-500">(Click × on any chip to remove)</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">7. Disabled state</h2>
        <div className="w-80">
          <Select options={users} value={users[0]} disabled placeholder="Disabled select" />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">8. Options with icons</h2>
        <div className="w-80">
          <Select options={users} value={singleValue} onChange={setSingleValue} placeholder="Choose a user" />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">9. Search/filtering</h2>
        <div className="w-80">
          <Select
            options={fruits}
            value={fruitsValue}
            onChange={setFruitsValue}
            placeholder="Pick a fruit"
            searchPlaceholder="Search fruit..."
          />
        </div>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">10. Multi async with search</h2>
        <div className="w-96">
          <Select
            multiple
            clearable
            loadOptions={loadFruitsAsync}
            value={multiFruitsValue}
            onChange={setMultiFruitsValue}
            placeholder="Select fruits"
            searchPlaceholder="Search fruit..."
          />
        </div>
        <p className="text-sm text-gray-500">Selected: {multiFruitsValue?.map((f) => f.label).join(', ') ?? 'none'}</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">11. Ref</h2>
        <div className="w-96">
          <Select
            multiple
            clearable
            loadOptions={loadFruitsAsync}
            ref={ref}
            placeholder="Select fruits"
            searchPlaceholder="Search fruit..."
          />
        </div>
      </section>
    </div>
  );
};
