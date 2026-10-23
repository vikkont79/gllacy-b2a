import { TOPPING_KIND_OPTIONS } from '@/entities/product/lib'

export const normalizeToppingName = (value: string) =>
  value.trim().replace(/\s+/g, ' ').toLowerCase()

export const RESERVED_TOPPING_NAMES: ReadonlySet<string> = new Set(
  TOPPING_KIND_OPTIONS.map(({ label }) => label.toLowerCase()),
)

export const isReservedToppingName = (name: string) =>
  RESERVED_TOPPING_NAMES.has(name)
