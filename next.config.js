/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const isDev = process.env.NODE_ENV === 'development';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Add 'unsafe-eval' in development for HMR/Fast Refresh
      `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval'" : ''} https://*.disqus.com https://*.disquscdn.com https://js.stripe.com https://plausible.io https://cdn.formbricks.com`,
      "connect-src 'self' https://api.stripe.com https://plausible.io https://*.disqus.com https://*.disquscdn.com https://cdn.formbricks.com",
      "img-src 'self' data: blob: https://*.disqus.com https://*.disquscdn.com",
      "style-src 'self' 'unsafe-inline' https://*.disqus.com https://*.disquscdn.com",
      "frame-src https://js.stripe.com https://*.disqus.com https://disqus.com https://cdn.formbricks.com https://www.youtube.com https://player.vimeo.com",
      "media-src 'self' blob:",
      "font-src 'self' data: https://*.disqus.com https://*.disquscdn.com"
    ].join('; ')
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const nextConfig = withContentlayer({
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  }
});

module.exports = nextConfig;
