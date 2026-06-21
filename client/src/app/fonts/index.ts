import { Lora, Source_Serif_4, Open_Sans, Montserrat } from 'next/font/google';
import { cn } from '@shared/utils/cn';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-open-sans'
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat'
});

const lora = Lora({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-lora'
});

const sourceSerif4 = Source_Serif_4({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-source-serif-4'
});

export const fontVariables = cn(openSans.variable, montserrat.variable, lora.variable, sourceSerif4.variable);
