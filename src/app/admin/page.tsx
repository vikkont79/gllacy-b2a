import type { Metadata } from 'next'

import { AdminProducts } from '@/sections/admin'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Админка',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  await requireAdmin()

  return <AdminProducts />
}
