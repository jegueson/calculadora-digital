/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export',
  basePath: '/calculadora-digital',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig; 