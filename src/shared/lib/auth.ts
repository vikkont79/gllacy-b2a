import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { admin, magicLink } from 'better-auth/plugins'
import { db } from '@db/client'
import * as authSchema from '@db/schema'
import { sendMagicLink } from '@/shared/lib/email'
import { env } from '@/shared/lib/env'

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
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