const { locales } = require('./lib/_locales')

module.exports = {
  i18n: {
    defaultLocale: locales.find((locale) => locale.default).value,
    locales: locales.map((locale) => locale.value)
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ['image/avif', 'image/webp'],
    domains: ['us-west-2.graphassets.com']
  },
  async redirects() {
    return [
      // "/home" duplicated the homepage; send it (and its link equity) to "/"
      { source: '/home', destination: '/', permanent: true }
    ]
  }
}
