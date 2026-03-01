import { Open_Sans, Montserrat, Courier_Prime, Crimson_Text } from 'next/font/google';

import { cn } from '@shared/lib';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat'
});

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-courier-prime'
});

const crimsonText = Crimson_Text({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-crimson-text'
});

export const fontVariables = cn(openSans.variable, montserrat.variable, courierPrime.variable, crimsonText.variable);
