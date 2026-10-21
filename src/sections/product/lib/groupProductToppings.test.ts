import { describe, expect, it } from 'vitest'

import type { ProductTopping } from '@/entities/product/types'
import { groupProductToppings } from './groupProductToppings'

const topping = (id: number, name: string, kind: ProductTopping['kind']): ProductTopping => ({
  id,
  name,
  kind,
})

describe('groupProductToppings', () => {
  it('возвращает пустой список для товара без наполнителей', () => {
    expect(groupProductToppings([])).toEqual([])
  })

  it('выводит маркер без именованных', () => {
    expect(groupProductToppings([topping(1, 'джем', 'jam')])).toEqual([
      { kind: 'jam', label: 'Джем', names: [] },
    ])
  })

  it('добавляет именованный к маркеру', () => {
    expect(
      groupProductToppings([
        topping(1, 'джем', 'jam'),
        topping(2, 'клубничный', 'jam'),
      ]),
    ).toEqual([{ kind: 'jam', label: 'Джем', names: ['клубничный'] }])
  })

  it('собирает несколько именованных одного вида', () => {
    expect(
      groupProductToppings([
        topping(1, 'джем', 'jam'),
        topping(2, 'клубничный', 'jam'),
        topping(3, 'малиновый', 'jam'),
      ]),
    ).toEqual([
      { kind: 'jam', label: 'Джем', names: ['клубничный', 'малиновый'] },
    ])
  })

  it('строит группу по именованному, даже если маркер потерян', () => {
    expect(groupProductToppings([topping(2, 'шоколад', 'sprinkle')])).toEqual([
      { kind: 'sprinkle', label: 'Посыпка', names: ['шоколад'] },
    ])
  })

  it('сортирует виды по порядку TOPPING_KIND_OPTIONS', () => {
    expect(
      groupProductToppings([
        topping(1, 'сироп', 'syrup'),
        topping(2, 'посыпка', 'sprinkle'),
        topping(3, 'джем', 'jam'),
        topping(4, 'кусочки', 'chunk'),
      ]),
    ).toEqual([
      { kind: 'chunk', label: 'Кусочки', names: [] },
      { kind: 'jam', label: 'Джем', names: [] },
      { kind: 'syrup', label: 'Сироп', names: [] },
      { kind: 'sprinkle', label: 'Посыпка', names: [] },
    ])
  })

  it('не добавляет маркер в имена и схлопывает повторы', () => {
    expect(
      groupProductToppings([
        topping(1, 'джем', 'jam'),
        topping(2, 'клубничный', 'jam'),
        topping(3, 'клубничный', 'jam'),
      ]),
    ).toEqual([{ kind: 'jam', label: 'Джем', names: ['клубничный'] }])
  })
})
