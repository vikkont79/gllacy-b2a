import type { ToppingKind } from '@/entities/product/types'

export const TOPPING_KIND_OPTIONS: ReadonlyArray<{ kind: ToppingKind; label: string }> = [
  { kind: 'chunk', label: 'Кусочки' },
  { kind: 'topping', label: 'Топпинги' },
  { kind: 'syrup', label: 'Сиропы' },
  { kind: 'sprinkle', label: 'Посыпки' },
]