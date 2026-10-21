import type { Metadata } from 'next'

import { AdminProductForm } from '@/sections/admin-product-form'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Новый товар',
}

export default async function NewProductPage() {
  await requireAdmin()

  return <AdminProductForm productId={null} />
}
