import type { MetadataRoute } from 'next';
import { solutions } from '@/data/solutions';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.rootstocktech.co.in';
  return [
    { url: base, changeFrequency: 'monthly', priority: 1 },
    ...solutions.map(({ slug }) => ({ url: `${base}/solutions/${slug}`, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/careers`, changeFrequency: 'monthly', priority: 0.4 },
  ];
}
