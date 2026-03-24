/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
  trailingSlash: true,
  basePath: '/iice-website',
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
