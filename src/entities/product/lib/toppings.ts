import type { ProductTopping, ToppingKind } from '@/entities/product/types'

/*
 * Подписи видов совпадают с именами маркеров в toppings.name
 * (с точностью до регистра). Это не косметика: по этому равенству
 * код отличает маркер категории от именованного наполнителя,
 * не заводя отдельную колонку или карту.
 */
export const TOPPING_KIND_OPTIONS: ReadonlyArray<{ kind: ToppingKind; label: string }> = [
  { kind: 'chunk', label: 'Кусочки' },
  { kind: 'jam', label: 'Джем' },
  { kind: 'syrup', label: 'Сироп' },
  { kind: 'sprinkle', label: 'Посыпка' },
]

/*
 * Маркер — строка вида, чьё имя равно подписи вида в нижнем регистре
 * («джем» для jam). Любое другое имя при том же kind — именованный
 * наполнитель («клубничный джем»).
 */
export const isMarkerTopping = ({ name, kind }: Pick<ProductTopping, 'name' | 'kind'>) =>
  TOPPING_KIND_OPTIONS.find((option) => option.kind === kind)?.label.toLowerCase() === name
