import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ebsu-buy-sell.vercel.app';
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/post'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}