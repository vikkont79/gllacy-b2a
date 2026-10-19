'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@db/client'
import { productToppings, products, toppings } from '@db/schema'
import { getToppings } from '@/entities/product/api/getToppings'
import { getAdminSession } from '@/shared/lib/requireAdmin'

import { resolveToppingIds } from '../lib'
import { productFormSchema, type ProductFormValues } from '../types'

export type SaveProductResult =
  | { ok: true; id: number }
  | { ok: false; error: string }

export const saveProduct = async (
  productId: number | null,
  values: ProductFormValues,
): Promise<SaveProductResult> => {
  const session = await getAdminSession()

  if (!session) {
    return { ok: false, error: 'Сессия истекла. Войдите заново.' }
  }

  const parsed = productFormSchema.safeParse(values)

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Проверьте поля формы',
    }
  }

  const data = parsed.data
  const catalog = await getToppings()
  const { toppingIds, missingMarkers } = resolveToppingIds(data.toppingIds, catalog)

  const payload = {
    price: Math.round(data.price * 100),
    calories: data.calories,
    protein: data.protein,
    fat: data.fat,
    carbs: data.carbs,
    shelfLife: data.shelfLife,
    image: data.image,
    description: data.description,
    composition: data.composition,
    isAvailable: data.isAvailable,
    isNew: data.isNew,
  }

  try {
    let slug: string

    if (productId === null) {
      const [existing] = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, data.slug))
        .limit(1)

      if (existing) {
        return { ok: false, error: 'Товар с таким адресом уже существует' }
      }

      slug = data.slug
    } else {
      const [existing] = await db
        .select({ id: products.id, slug: products.slug })
        .from(products)
        .where(eq(products.id, productId))
        .limit(1)

      if (!existing) {
        return { ok: false, error: 'Товар не найден' }
      }

      slug = existing.slug
    }

    const savedId = await db.transaction(async (tx) => {
      let id: number

      if (productId === null) {
        const [created] = await tx
          .insert(products)
          .values({
            name: data.name,
            slug: data.slug,
            base: data.base,
            flavourId: data.flavourId,
            ...payload,
          })
          .returning({ id: products.id })

        if (!created) throw new Error('Не удалось создать товар')

        id = created.id
      } else {
        const [updated] = await tx
          .update(products)
          .set({ ...payload, updatedAt: new Date() })
          .where(eq(products.id, productId))
          .returning({ id: products.id })

        if (!updated) throw new Error('Не удалось обновить товар')

        id = updated.id
      }

      const finalToppingIds = new Set(toppingIds)

      for (const marker of missingMarkers) {
        const [inserted] = await tx
          .insert(toppings)
          .values(marker)
          .onConflictDoNothing()
          .returning({ id: toppings.id })

        if (inserted) {
          finalToppingIds.add(inserted.id)
          continue
        }

        const [found] = await tx
          .select({ id: toppings.id })
          .from(toppings)
          .where(eq(toppings.name, marker.name))
          .limit(1)

        if (found) finalToppingIds.add(found.id)
      }

      await tx.delete(productToppings).where(eq(productToppings.productId, id))

      if (finalToppingIds.size > 0) {
        await tx
          .insert(productToppings)
          .values([...finalToppingIds].map((toppingId) => ({ productId: id, toppingId })))
      }

      return id
    })

    revalidatePath('/admin')
    revalidatePath('/')
    revalidatePath('/products')
    revalidatePath(`/products/${slug}`)

    return { ok: true, id: savedId }
  } catch (error) {
    console.error('Ошибка сохранения товара', error)

    if (
      error instanceof Error &&
      error.message.includes('UNIQUE constraint failed: products.slug')
    ) {
      return { ok: false, error: 'Товар с таким адресом уже существует' }
    }

    if (error instanceof Error && error.message.includes('FOREIGN KEY constraint failed')) {
      return { ok: false, error: 'Выберите вкус из списка' }
    }

    return { ok: false, error: 'Не удалось сохранить товар' }
  }
}
