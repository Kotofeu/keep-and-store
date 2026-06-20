import { Lora, Playfair_Display, Open_Sans, Montserrat } from 'next/font/google';
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

const playfairDisplay = Playfair_Display({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-playfair-display'
});

export const fontVariables = cn(openSans.variable, montserrat.variable, lora.variable, playfairDisplay.variable);
