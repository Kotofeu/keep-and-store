import { type FC, type ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = async ({ children }) => children;

export default RootLayout;
