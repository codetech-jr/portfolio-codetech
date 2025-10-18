/** @type {import('next').NextConfig} */
const nextConfig = {
  // transpilePackages ahora es una propiedad de primer nivel,
  // al mismo nivel que 'images'.
  transpilePackages: ['@nivo/core', '@nivo/geo', 'd3-geo'],

  images: {
    // La configuración de remotePatterns se mantiene como estaba.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;