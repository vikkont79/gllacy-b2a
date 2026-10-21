import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { AdminProductForm } from '@/sections/admin-product-form'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Редактирование товара',
}

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAdmin()

  const { id } = await params

  if (!/^\d+$/.test(id)) {
    notFound()
  }

  return <AdminProductForm productId={Number(id)} />
}
