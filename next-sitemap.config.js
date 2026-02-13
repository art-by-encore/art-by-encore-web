/** @type {import('next-sitemap').IConfig} */

const baseUrl = 'https://art-by-encore.vercel.app/'     

const config = {
  siteUrl: baseUrl,
  generateIndexSitemap: true,
  changefreq: 'monthly',
  priority: 0.8,

  exclude: ['/api/*'],
};

module.exports = config;