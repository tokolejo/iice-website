/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  ...(process.env.NEXT_EXPORT === 'true' ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/webmail',
        destination: 'https://mail.zoho.com/',
        permanent: false,
      },
      {
        source: '/webmail/:path*',
        destination: 'https://mail.zoho.com/',
        permanent: false,
      },
      {
        source: '/cpanel',
        destination: 'https://mail.iice.ge:2083',
        permanent: false,
      },
      {
        source: '/cpanel/:path*',
        destination: 'https://mail.iice.ge:2083/:path*',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/:path*.doc',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment',
          },
        ],
      },
      {
        source: '/:path*.docx',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
