import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://invitationkami.com'

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/share-generator', '/i/*'],
        disallow: ['/admin/*', '/dashboard/*', '/api/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
