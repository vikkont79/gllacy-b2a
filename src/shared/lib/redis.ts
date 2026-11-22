import 'server-only'

import { Redis } from '@upstash/redis'

import { env } from './env'

/*
 * Один экземпляр на процесс. Upstash — REST-клиент: подключение не открывается
 * при импорте, поэтому создание на уровне модуля безопасно.
 *
 * Берём значения из провалидированного env, а не через Redis.fromEnv():
 * fromEnv читает process.env напрямую и обходит zod-схему.
 */
export const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
})
