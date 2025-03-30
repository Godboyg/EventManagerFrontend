/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/:path*',
            destination: 'https://eventmanagerbackend-tdar.onrender.com/:path*', // Proxy API requests to Node.js server
          },
        ];
      },
};

export default nextConfig;
