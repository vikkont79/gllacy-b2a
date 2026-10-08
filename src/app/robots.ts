import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/shared/config'

/*
 * robots.txt. Пока открыт весь сайт: админки нет, служебных путей тоже.
 * Запреты добавляются вместе с появлением разделов — /admin и /api.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}