import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['**/*.{test,spec}.{ts,tsx}'],
          exclude: [
            'e2e/**',
            '**/*.story.{ts,tsx}',
            '**/*.stories.{ts,tsx}',
            '**/node_modules/**'
          ],
          setupFiles: ['./vitest.setup.ts'],
          globals: false
        }
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            storybookScript: 'pnpm run storybook'
          })
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: 'chromium' }]
          },
          setupFiles: ['./.storybook/vitest.setup.ts']
        }
      }
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/node_modules/**',
        '**/*.d.ts',
        '**/*.story.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
        'e2e/**',
        'coverage/**',
        '.storybook/**',
        '**/*.config.*',
        '**/index.ts',
        '**/types.ts',
        '**/types/**'
      ]
    }
  }
});
