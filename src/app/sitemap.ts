import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://invitationkami.com'
  const currentDate = new Date()

  // Standard static public pages
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/share-generator`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]

  // Demo invitation preview routes
  const demoThemes = [
    'oceanic',
    'terracotta',
    'botanical',
    'celestial',
    'rustic',
    'vintage',
    'luxury',
    'elegant',
    'modern',
    'floral',
    'minimalist',
    'blossom',
  ]

  const demoRoutes = demoThemes.map((slug) => ({
    url: `${baseUrl}/i/demo-${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...demoRoutes]
}
