import { isMarkerTopping, TOPPING_KIND_OPTIONS } from '@/entities/product/lib'
import type { ProductTopping, ToppingKind } from '@/entities/product/types'

type ResolvedToppings = {
  toppingIds: number[]
  missingMarkers: { name: string; kind: ToppingKind }[]
}

/*
 * Чистая логика поверх каталога: маркеры выбранных видов добавляются
 * сами, неизвестные id игнорируются, дубли схлопываются. Если маркера
 * вида в каталоге нет — сообщаем, что его надо создать, но не трогаем БД.
 */
export const resolveToppingIds = (
  selectedIds: number[],
  catalog: ProductTopping[],
): ResolvedToppings => {
  const selected = new Set(selectedIds)
  const picked = catalog.filter((topping) => selected.has(topping.id))
  const resolved = new Set(picked.map((topping) => topping.id))

  const namedKinds = new Set<ToppingKind>()

  for (const topping of picked) {
    if (isMarkerTopping(topping)) continue

    namedKinds.add(topping.kind)

    const marker = catalog.find(
      (candidate) => candidate.kind === topping.kind && isMarkerTopping(candidate),
    )

    if (marker) resolved.add(marker.id)
  }

  const missingMarkers = [...namedKinds]
    .filter((kind) => !catalog.some((topping) => topping.kind === kind && isMarkerTopping(topping)))
    .flatMap((kind) => {
      const label = TOPPING_KIND_OPTIONS.find((option) => option.kind === kind)?.label

      return label ? [{ name: label.toLowerCase(), kind }] : []
    })

  return { toppingIds: [...resolved], missingMarkers }
}
