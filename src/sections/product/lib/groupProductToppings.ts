import { isMarkerTopping, TOPPING_KIND_OPTIONS } from '@/entities/product/lib'
import type { ProductTopping, ToppingKind } from '@/entities/product/types'

export type ProductToppingGroup = {
  kind: ToppingKind
  label: string
  names: string[]
}

export const groupProductToppings = (
  toppings: ProductTopping[],
): ProductToppingGroup[] => {
  const markerKinds = new Set<ToppingKind>()
  const namesByKind = new Map<ToppingKind, string[]>()

  for (const topping of toppings) {
    if (isMarkerTopping(topping)) {
      markerKinds.add(topping.kind)
      continue
    }

    const names = namesByKind.get(topping.kind)

    if (names) {
      if (!names.includes(topping.name)) {
        names.push(topping.name)
      }

      continue
    }

    namesByKind.set(topping.kind, [topping.name])
  }

  return TOPPING_KIND_OPTIONS.flatMap(({ kind, label }) => {
    const names = namesByKind.get(kind)

    if (!markerKinds.has(kind) && !names) {
      return []
    }

    return [{ kind, label, names: names ?? [] }]
  })
}
