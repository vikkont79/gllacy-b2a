import type { Metadata } from 'next'

import { AdminProducts } from '@/sections/admin-products'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Товары',
}

export default async function ProductsPage() {
  await requireAdmin()

  return <AdminProducts />
}
