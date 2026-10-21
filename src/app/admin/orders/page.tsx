import type { Metadata } from 'next'

import { AdminOrders } from '@/sections/admin-orders'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Заказы',
}

export default async function OrdersPage() {
  await requireAdmin()

  return <AdminOrders />
}
