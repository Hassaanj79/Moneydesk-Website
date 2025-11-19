import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://moneydesk.co'
  
  const routes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/features',
    '/pricing',
    '/contact',
    '/careers',
    '/blog',
    '/security',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}

