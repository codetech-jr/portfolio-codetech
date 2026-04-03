import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from '@ducanh2912/next-pwa';

const withNextIntl = createNextIntlPlugin('./i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nivo/core', '@nivo/geo', 'd3-geo'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
    qualities: [75, 80, 95],
  },
  webpack: (config, { isServer, nextRuntime }) => {
    // Prevent Sanity Studio packages from being bundled into the Next.js app pages.
    // The sanity.config.js in root is meant for the Studio route only.
    // We mark all problematic sanity internals as false (empty module).
    const sanityExternals = [
      '@sanity/types',
      'react-is',
      '@sanity/insert-menu',
      '@sanity/ui',
      '@sanity/vision',
      '@sanity/code-input',
      '@portabletext/block-tools',
      '@portabletext/editor',
    ];
    sanityExternals.forEach((pkg) => {
      config.resolve.alias[pkg] = false;
    });
    return config;
  },
};

const withPWA = withPWAInit({
  dest: 'public',
  // Allow temporarily disabling PWA for experiments via DISABLE_PWA=true
  disable: process.env.DISABLE_PWA === 'true' || process.env.NODE_ENV === 'development',
});

export default withPWA(withNextIntl(nextConfig));