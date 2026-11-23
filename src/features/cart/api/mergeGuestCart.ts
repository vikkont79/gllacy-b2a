import 'server-only'

import { redis } from '@/shared/lib/redis'

import {
  CART_MAX_KG,
  CART_USER_TTL_SECONDS,
  guestCartKey,
  userCartKey,
} from '../lib'

/*
 * Слияние гостевой корзины в аккаунтную. Скрипт атомарный: две вкладки,
 * одновременно вызвавшие мердж, не задвоят количества — вторая увидит уже
 * удалённый guest-ключ. Количества суммируются и подрезаются до CART_MAX_KG.
 *
 * Товары не проверяем: удалённые вычистит getCart при чтении, недоступные
 * останутся в корзине с пометкой. Формула совпадает с mergeQuantity.
 */
const MERGE_SCRIPT = `
local guest = KEYS[1]
local user = KEYS[2]
local ttl = tonumber(ARGV[1])
local max = tonumber(ARGV[2])

local entries = redis.call('HGETALL', guest)

if #entries == 0 then
  redis.call('DEL', guest)
  return redis.call('HLEN', user)
end

for i = 1, #entries, 2 do
  local field = entries[i]
  local add = tonumber(entries[i + 1]) or 0
  local current = tonumber(redis.call('HGET', user, field) or '0') or 0
  local total = current + add

  if total < 1 then total = 1 end
  if total > max then total = max end

  redis.call('HSET', user, field, total)
end

redis.call('EXPIRE', user, ttl)
redis.call('DEL', guest)

return redis.call('HLEN', user)
`

export const mergeGuestCart = async (
  guestId: string,
  userId: string,
): Promise<number> =>
  redis.eval<[string, string], number>(
    MERGE_SCRIPT,
    [guestCartKey(guestId), userCartKey(userId)],
    [String(CART_USER_TTL_SECONDS), String(CART_MAX_KG)],
  )
