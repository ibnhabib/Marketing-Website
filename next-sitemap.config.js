/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.pakistanlogistics.com',
  generateRobotsTxt: true,
  exclude: ['/home', '/api/*', '/404'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }]
  },
  transform: async (config, path) => ({
    loc: path,
    changefreq: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1.0 : path.startsWith('/blog/') ? 0.6 : 0.8,
    lastmod: new Date().toISOString()
  })
}
