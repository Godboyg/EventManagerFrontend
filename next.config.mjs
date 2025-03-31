/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            // destination: 'http://localhost:4000/:path*', // Proxy API requests to Node.js server
            destination: 'https://eventmanagerbackend-tdar.onrender.com/:path*', // Proxy API requests to Node.js server
          },
        ];
      },
};

export default nextConfig;
