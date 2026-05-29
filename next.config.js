const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  output: isStaticExport ? 'export' : undefined,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Add your own image CDN domain here:
      // {
      //   protocol: 'https',
      //   hostname: 'your-cdn.example.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
