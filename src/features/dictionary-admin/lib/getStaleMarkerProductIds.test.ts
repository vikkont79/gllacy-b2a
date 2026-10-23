import { describe, expect, it } from 'vitest'

import { getStaleMarkerProductIds } from './getStaleMarkerProductIds'

const markerId = 10

describe('getStaleMarkerProductIds', () => {
  it('снимает маркер, если у товара остался только он', () => {
    const links = [{ productId: 1, toppingId: markerId, kind: 'jam' as const }]

    expect(getStaleMarkerProductIds([1], links, 'jam', markerId)).toEqual([1])
  })

  it('не трогает маркер, если остался другой наполнитель вида', () => {
    const links = [
      { productId: 1, toppingId: markerId, kind: 'jam' as const },
      { productId: 1, toppingId: 11, kind: 'jam' as const },
    ]

    expect(getStaleMarkerProductIds([1], links, 'jam', markerId)).toEqual([])
  })

  it('снимает маркер вида, даже если у товара есть другой вид', () => {
    const links = [
      { productId: 1, toppingId: markerId, kind: 'jam' as const },
      { productId: 1, toppingId: 12, kind: 'sprinkle' as const },
    ]

    expect(getStaleMarkerProductIds([1], links, 'jam', markerId)).toEqual([1])
  })

  it('возвращает только переданные товары', () => {
    const links = [{ productId: 2, toppingId: markerId, kind: 'jam' as const }]

    expect(getStaleMarkerProductIds([1], links, 'jam', markerId)).toEqual([1])
  })
})
