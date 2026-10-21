import type { Metadata } from 'next'

import { AdminClients } from '@/sections/admin-clients'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Клиенты',
}

export default async function ClientsPage() {
  await requireAdmin()

  return <AdminClients />
}
