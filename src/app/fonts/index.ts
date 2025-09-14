import { Open_Sans, Roboto } from 'next/font/google';

export const textFont = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500'],
  variable: '--text-font',
  display: 'swap',
  preload: true
});

export const titleFont = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '800'],
  variable: '--title-font',
  display: 'swap',
  preload: true
});
