/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  ...(process.env.NEXT_EXPORT === 'true' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
