import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  TURSO_DATABASE_URL: z.string().min(1, 'TURSO_DATABASE_URL не задан'),
  TURSO_AUTH_TOKEN: z.string().min(1, 'TURSO_AUTH_TOKEN не задан'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  BETTER_AUTH_SECRET: z.string().min(32, 'BETTER_AUTH_SECRET: минимум 32 символа'),
  BETTER_AUTH_URL: z.string().url('BETTER_AUTH_URL: ожидается http://localhost:3000 или https://…'),
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