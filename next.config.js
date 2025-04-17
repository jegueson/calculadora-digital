/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://dev.calculadora-digital.com.br' : '',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig; 