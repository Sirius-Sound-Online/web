/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // 'unsafe-eval' is required for MDX content rendering via next-contentlayer
      // 'unsafe-inline' is required for styled components and Next.js inline scripts
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.disqus.com https://*.disquscdn.com https://js.stripe.com https://plausible.io https://cdn.formbricks.com",
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
