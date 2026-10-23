import type { ToppingKind } from '@/entities/product/types'

type RemainingLink = {
  productId: number
  toppingId: number
  kind: ToppingKind
}

export const getStaleMarkerProductIds = (
  productIds: number[],
  remainingLinks: RemainingLink[],
  kind: ToppingKind,
  markerId: number,
): number[] =>
  productIds.filter(
    (productId) =>
      !remainingLinks.some(
        (link) =>
          link.productId === productId &&
          link.kind === kind &&
          link.toppingId !== markerId,
      ),
  )
