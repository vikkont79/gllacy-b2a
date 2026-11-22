import type { CartItem } from '../types'

/*
 * Стоимость позиции в копейках. Цена в БД — копейки за килограмм,
 * количество — целые кг, поэтому умножение без дробей и округлений.
 * Недоступный товар в итог не входит, но остаётся в корзине.
 */
export const calculateLineTotal = (
  item: Pick<CartItem, 'price' | 'quantity' | 'isAvailable'>,
): number => (item.isAvailable ? item.price * item.quantity : 0)

export const calculateCartTotal = (items: readonly CartItem[]): number =>
  items.reduce((total, item) => total + calculateLineTotal(item), 0)
