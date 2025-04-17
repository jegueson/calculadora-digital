/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/calculadora_digital',
};

module.exports = nextConfig; 