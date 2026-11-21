'use server'

import { and, eq, inArray } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@db/client'
import { productToppings, products, toppings } from '@db/schema'
import { TOPPING_KIND_OPTIONS } from '@/entities/product/lib'
import { getAdminSession } from '@/shared/lib/requireAdmin'

import {
  getStaleMarkerProductIds,
  isReservedToppingName,
  normalizeToppingName,
} from '../lib'

export type DeleteToppingResult =
  | { success: true }
  | { success: false; error: string }

export const deleteTopping = async (
  toppingId: number,
): Promise<DeleteToppingResult> => {
  const session = await getAdminSession()

  if (!session) {
    return { success: false, error: 'Сессия истекла. Войдите заново.' }
  }

  if (!Number.isInteger(toppingId) || toppingId <= 0) {
    return { success: false, error: 'Наполнитель не найден' }
  }

  try {
    const [topping] = await db
      .select({
        id: toppings.id,
        name: toppings.name,
        kind: toppings.kind,
      })
      .from(toppings)
      .where(eq(toppings.id, toppingId))
      .limit(1)

    if (!topping) {
      return { success: false, error: 'Наполнитель не найден' }
    }

    if (isReservedToppingName(normalizeToppingName(topping.name))) {
      return { success: false, error: 'Маркеры категорий удалять нельзя' }
    }

    const affected = await db
      .select({
        productId: productToppings.productId,
        slug: products.slug,
      })
      .from(productToppings)
      .innerJoin(products, eq(products.id, productToppings.productId))
      .where(eq(productToppings.toppingId, toppingId))

    const affectedProductIds = affected.map(({ productId }) => productId)
    const label = TOPPING_KIND_OPTIONS.find(
      (option) => option.kind === topping.kind,
    )?.label

    await db.transaction(async (tx) => {
      await tx
        .delete(productToppings)
        .where(eq(productToppings.toppingId, toppingId))

      if (affectedProductIds.length > 0 && label) {
        const markerName = label.toLowerCase()

        const [marker] = await tx
          .select({ id: toppings.id })
          .from(toppings)
          .where(
            and(
              eq(toppings.name, markerName),
              eq(toppings.kind, topping.kind),
            ),
          )
          .limit(1)

        if (marker) {
          const remaining = await tx
            .select({
              productId: productToppings.productId,
              toppingId: productToppings.toppingId,
              kind: toppings.kind,
            })
            .from(productToppings)
            .innerJoin(toppings, eq(toppings.id, productToppings.toppingId))
            .where(inArray(productToppings.productId, affectedProductIds))

          const staleProductIds = getStaleMarkerProductIds(
            affectedProductIds,
            remaining,
            topping.kind,
            marker.id,
          )

          if (staleProductIds.length > 0) {
            await tx
              .delete(productToppings)
              .where(
                and(
                  eq(productToppings.toppingId, marker.id),
                  inArray(productToppings.productId, staleProductIds),
                ),
              )
          }
        }
      }

      await tx.delete(toppings).where(eq(toppings.id, toppingId))
    })

    revalidatePath('/admin/dictionaries')
    revalidatePath('/')
    revalidatePath('/products')

    for (const { slug } of affected) {
      revalidatePath(`/products/${slug}`)
    }

    return { success: true }
  } catch (error) {
    console.error(`Ошибка удаления наполнителя ${toppingId}`, error)
    return { success: false, error: 'Не удалось удалить наполнитель' }
  }
}
