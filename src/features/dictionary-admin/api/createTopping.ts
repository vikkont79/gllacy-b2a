'use server'

import { LibsqlError } from '@libsql/client'
import { and, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '@db/client'
import { toppings } from '@db/schema'
import { getAdminSession } from '@/shared/lib/requireAdmin'

import { toppingCreateSchema } from '../types'

export type CreateToppingResult =
  | { success: true }
  | { success: false; error: string }

export const createTopping = async (
  kind: string,
  name: string,
): Promise<CreateToppingResult> => {
  const session = await getAdminSession()

  if (!session) {
    return { success: false, error: 'Сессия истекла. Войдите заново.' }
  }

  const parsed = toppingCreateSchema.safeParse({ kind, name })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Проверьте название',
    }
  }

  const [existing] = await db
    .select({ id: toppings.id })
    .from(toppings)
    .where(
      and(
        eq(toppings.name, parsed.data.name),
        eq(toppings.kind, parsed.data.kind),
      ),
    )
    .limit(1)

  if (existing) {
    return { success: false, error: 'Такой наполнитель уже есть' }
  }

  try {
    await db.insert(toppings).values(parsed.data)

    revalidatePath('/admin/dictionaries')

    return { success: true }
  } catch (error) {
    console.error('Ошибка создания наполнителя', error)

    if (
      error instanceof Error &&
      error.cause instanceof LibsqlError &&
      error.cause.code === 'SQLITE_CONSTRAINT'
    ) {
      return { success: false, error: 'Такой наполнитель уже есть' }
    }

    return { success: false, error: 'Не удалось создать наполнитель' }
  }
}
