'use server';

import { Option } from '@/shared/ui/select';

export const loadTestOptions = async (): Promise<Option<string>[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const shouldThrowError = Math.random() > 1; // 20% chance
        if (shouldThrowError) {
          throw new Error('Произошла ошибка при загрузке опций');
        }

        const options: Option<string>[] = Array.from({ length: 10000 }, (_, index) => ({
          value: `${index}`,
          label: `Option ${index}`
        }));
        resolve(options);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
