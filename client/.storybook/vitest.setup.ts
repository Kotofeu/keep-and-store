import * as a11yAddon from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/nextjs-vite';
import { beforeAll } from 'vitest';
import * as previewAnnotations from './preview';

const annotations = setProjectAnnotations([previewAnnotations, a11yAddon]);
beforeAll(annotations.beforeAll);
