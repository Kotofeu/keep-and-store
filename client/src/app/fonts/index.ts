import { EB_Garamond, Literata, Open_Sans, Montserrat } from 'next/font/google';
import { cn } from '@shared/utils/cn';

const openSans = Open_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-open-sans'
});

const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-montserrat'
});

const ebGaramond = EB_Garamond({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-eb-garamond'
});

const literata = Literata({
  subsets: ['cyrillic', 'latin'],
  variable: '--font-literata'
});

export const fontVariables = cn(
  openSans.variable,
  montserrat.variable,
  ebGaramond.variable,
  literata.variable
);
