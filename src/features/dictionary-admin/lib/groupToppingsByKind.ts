import { isMarkerTopping, TOPPING_KIND_OPTIONS } from '@/entities/product/lib'
import type { ProductTopping, ToppingKind } from '@/entities/product/types'

export type ToppingGroupData = {
  kind: ToppingKind
  label: string
  items: ProductTopping[]
}

export const groupToppingsByKind = (
  toppings: ProductTopping[],
): ToppingGroupData[] =>
  TOPPING_KIND_OPTIONS.map(({ kind, label }) => ({
    kind,
    label,
    items: toppings
      .filter((topping) => topping.kind === kind && !isMarkerTopping(topping))
      .sort((a, b) => a.name.localeCompare(b.name, 'ru')),
  }))
