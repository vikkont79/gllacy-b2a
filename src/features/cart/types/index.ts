import { z } from 'zod'

import { CART_MAX_KG, CART_MIN_KG } from '../lib/constants'

export const cartProductIdSchema = z
  .number()
  .int('Некорректный товар')
  .positive('Некорректный товар')

export const cartQuantitySchema = z
  .number()
  .int('Количество должно быть целым')
  .min(CART_MIN_KG, `Минимум ${CART_MIN_KG} кг`)
  .max(CART_MAX_KG, `Максимум ${CART_MAX_KG} кг`)

export type CartItem = {
  productId: number
  slug: string
  name: string
  image: string
  price: number
  quantity: number
  isAvailable: boolean
}

export type CartSnapshot = {
  items: CartItem[]
  total: number
  count: number
}

export type CartMutationResult =
  | { success: true; quantity: number; count: number }
  | { success: false; error: string }
