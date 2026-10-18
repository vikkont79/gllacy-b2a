import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, magicLink } from 'better-auth/plugins'
import { db } from '@db/client'
import * as authSchema from '@db/schema'
import { sendMagicLink } from '@/shared/lib/email'
import { env } from '@/shared/lib/env'

/*
 * Адрес деплоя на Vercel меняется на каждый push, поэтому в превью
 * BETTER_AUTH_URL не годится: в нём либо боевой адрес, либо ничего.
 *
 * Прописывать его нельзя и по другой причине: список доверенных origin
 * better-auth считает без request, и при незаданном baseURL он остаётся
 * пустым — тогда любой запрос к авторизации падает с FORBIDDEN. Выводить
 * адрес из самого запроса не помогает.
 *
 * Ветка превью намеренно не смотрит на BETTER_AUTH_URL: заведём туда боевой
 * адрес — и превью снова сломается. В проде явное значение приоритетнее,
 * это задел на собственный домен.
 */
const vercelBaseURL = env.VERCEL_URL ? `https://${env.VERCEL_URL}` : undefined

const baseURL =
  env.VERCEL_ENV === 'preview'
    ? vercelBaseURL
    : (env.BETTER_AUTH_URL ?? vercelBaseURL)

export const auth = betterAuth({
  baseURL,
  secret: env.BETTER_AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: authSchema,
  }),
  socialProviders: env.VK_ID && env.VK_SECRET
    ? { vk: { clientId: env.VK_ID, clientSecret: env.VK_SECRET } }
    : {},
  plugins: [
    magicLink({
      // Плагин отдаёт объект с токеном, sendMagicLink работает с адресом и
      // ссылкой — лишнее прокидываем мимо.
      sendMagicLink: ({ email, url }) => sendMagicLink(email, url),
      // Дефолтные 5 запросов на IP в минуту слишком мало для открытой
      // регистрации: за одним IP сидит весь офис или мобильный оператор.
      rateLimit: { window: 300, max: 10 },
    }),
    admin(),
    nextCookies(),
  ],
})