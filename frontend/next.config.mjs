/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.equitylawandco.com',
        pathname: '/**',
      },
      {
        protocol: process.env.NEXT_PUBLIC_API_PROTOCOL || 'http',
        hostname: process.env.NEXT_PUBLIC_API_HOST || 'localhost',
        port: process.env.NEXT_PUBLIC_API_PORT || '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'equitylawandco.pythonanywhere.com',
        pathname: '/media/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2678400, // 31 days - images are already cached locally
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
