import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      '@': '.',
      '@app': './app',
      '@src': './src',
      '@pages': './src/pages',
      '@widgets': './src/widgets',
      '@features': './src/features',
      '@entities': './src/entities',
      '@shared': './src/shared'
    }
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '.',
      '@app': './app',
      '@src': './src',
      '@pages': './src/pages',
      '@widgets': './src/widgets',
      '@features': './src/features',
      '@entities': './src/entities',
      '@shared': './src/shared'
    };
    return config;
  }
};

export default nextConfig;
