import { CART_MAX_KG, CART_MIN_KG } from './constants'

/*
 * Разбирает ручной ввод в поле «кг». null — значение невалидно, UI тогда
 * оставляет прежнее количество, а не затирает его на каждом нажатии.
 * Принимаем только целые кг в допустимом диапазоне.
 */
export const parseQuantityInput = (raw: string): number | null => {
  const value = raw.trim()

  if (!/^\d+$/.test(value)) return null

  const quantity = Number(value)

  if (quantity < CART_MIN_KG || quantity > CART_MAX_KG) return null

  return quantity
}

/* Страховка после HINCRBY: параллельные клики не уведут количество за предел. */
export const clampQuantity = (value: number): number =>
  Math.min(CART_MAX_KG, Math.max(CART_MIN_KG, Math.trunc(value)))
