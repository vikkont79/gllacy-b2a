import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().min(1, 'TURSO_DATABASE_URL не задан'),
  TURSO_AUTH_TOKEN: z.string().min(1, 'TURSO_AUTH_TOKEN не задан'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET: минимум 32 символа'),
  // Необязательна намеренно: на Vercel адрес берётся из VERCEL_URL, потому что
  // у превью он свой на каждый деплой. Обязательное требование роняло сборку
  // целиком, включая публичные страницы вроде sitemap, которым авторизация не
  // нужна. Локально остаётся в .env и работает как раньше.
  BETTER_AUTH_URL: z.string().url('BETTER_AUTH_URL: ожидается http://localhost:3000 или https://…').optional(),
  // Vercel подставляет их сам, локально они отсутствуют. Нужны, чтобы в
  // превью собирать свой baseURL: адрес деплоя там свой на каждый push, и
  // без него origin запроса не совпадает с baseURL — better-auth отвечает
  // FORBIDDEN и вход в превью не работает.
  VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
  VERCEL_URL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  VK_ID: z.string().optional(),
  VK_SECRET: z.string().optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error('Ошибка конфигурации окружения:')
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`)
  }
  throw new Error('Проверьте переменные окружения в .env и перезапустите приложение')
}

export const env = parsed.data