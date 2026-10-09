import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/shared/config'

/*
 * robots.txt. Открыт весь сайт и будущий публичный API — агенты должны его
 * читать. Закрыты только служебные пути: сессии Better Auth и вебхуки.
 * Правило /api целиком НЕ используется: оно закроет /api/public, который
 * появится вместе с публичным API для агентов.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/auth', '/api/webhooks'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}