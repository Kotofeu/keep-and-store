import { Metadata } from 'next';
import { FC, ReactNode } from 'react';

import { getDefaultMetadata } from '@/shared/lib';

import '@/app/styles/index.scss';
// Without this, fonts do not work correctly on the page not found
import '@/app/fonts';

type RootLayoutProps = {
  children: ReactNode;
};

export const generateMetadata = async (): Promise<Metadata> => getDefaultMetadata();

const RootLayout: FC<RootLayoutProps> = ({ children }) => children;

export default RootLayout;
