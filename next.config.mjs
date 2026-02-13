/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], 
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              img-src 'self' https://res.cloudinary.com https://*.supabase.co data: blob:;
              media-src 'self' https://res.cloudinary.com https://*.supabase.co blob:;
              frame-src 'self' https://www.google.com https://maps.google.com https://maps.googleapis.com;
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://*.supabase.co;
              style-src 'self' 'unsafe-inline';
              connect-src 'self' 
                https://res.cloudinary.com 
                https://*.supabase.co 
                https://www.googletagmanager.com 
                https://*.google-analytics.com 
                https://analytics.google.com;
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ];
  },
};

export default nextConfig;