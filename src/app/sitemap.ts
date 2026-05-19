import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebsu-buy-sell.vercel.app';

  const [products, services, jobs] = await Promise.all([
    prisma.product.findMany({ select: { id: true, createdAt: true } }),
    prisma.service.findMany({ select: { id: true, createdAt: true } }),
    prisma.job.findMany({ select: { id: true, createdAt: true } }),
  ]);

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/marketplace`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'hourly', priority: 0.9 },
    ...products.map((p) => ({ url: `${baseUrl}/marketplace/${p.id}`, lastModified: p.createdAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...services.map((s) => ({ url: `${baseUrl}/services/${s.id}`, lastModified: s.createdAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...jobs.map((j) => ({ url: `${baseUrl}/jobs/${j.id}`, lastModified: j.createdAt, changeFrequency: 'weekly' as const, priority: 0.7 })),
  ];
}