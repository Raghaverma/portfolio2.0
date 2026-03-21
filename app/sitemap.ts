import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://raghav-verma.com'

    return [
        {
            url: baseUrl,
            lastModified: new Date('2026-03-22'),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/work`,
            lastModified: new Date('2026-03-22'),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/experience`,
            lastModified: new Date('2026-03-22'),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date('2026-03-22'),
            changeFrequency: 'yearly',
            priority: 0.7,
        },
    ]
}
