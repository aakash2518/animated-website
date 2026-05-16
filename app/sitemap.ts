import { MetadataRoute } from 'next';
import { services } from '@/data/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://royalfinitytechnologies.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/blog',
    '/teams',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...serviceRoutes];
}
