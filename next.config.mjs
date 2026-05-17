/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.18.107'],
    images: {
    // domains: ['your-domain.com'],
     localPatterns: [
      {
        pathname: '/**',
      } ]
  }
};

export default nextConfig;
