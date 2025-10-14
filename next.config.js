/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://giscus.app https://js.stripe.com https://plausible.io https://cdn.formbricks.com",
      "connect-src 'self' https://api.stripe.com https://plausible.io https://giscus.app https://cdn.formbricks.com",
      "img-src 'self' data: blob:",
      "style-src 'self' 'unsafe-inline'",
      "frame-src https://js.stripe.com https://giscus.app https://cdn.formbricks.com",
      "media-src 'self' blob:",
      "font-src 'self' data:"
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
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en'
  },
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
