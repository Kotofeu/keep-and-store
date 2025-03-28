import { FC, ReactNode } from 'react';
import { Metadata } from 'next';

import { routing } from '@/shared/i18n';
import { BaseLayoutProps } from '@/shared/types';
import { getDefaultMetadata } from '@/shared/lib';

export const generateMetadata = async ({ params }: Omit<BaseLayoutProps, 'children'>): Promise<Metadata> => {
  const { locale } = await params;
  return { ...getDefaultMetadata(routing.pathnames['/about'], locale), title: 'ABOUT' };
};

const AboutLayout: FC<{ children: ReactNode }> = ({ children }) => children;

export default AboutLayout;
