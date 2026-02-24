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
          // Content Security Policy
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
          // Prevent clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Prevent MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Control referrer information
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Control browser features
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          // Enable HSTS (HTTP Strict Transport Security)
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // Prevent Internet Explorer from executing unwanted downloads
          {
            key: 'X-Download-Options',
            value: 'noopen',
          },
         
        ],
      },
    ];
  },
};

export default nextConfig;