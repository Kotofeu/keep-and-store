import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@app': './app',
      '@public': './public',
      '@pages': './src/pages',
      '@widgets': './src/widgets',
      '@features': './src/features',
      '@entities': './src/entities',
      '@shared': './src/shared',
      '@src': './src'
    }
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@app': './app',
      '@public': './public',
      '@pages': './src/pages',
      '@widgets': './src/widgets',
      '@features': './src/features',
      '@entities': './src/entities',
      '@shared': './src/shared',
      '@src': './src'
    };
    return config;
  }
};

export default nextConfig;
