import type { Metadata } from 'next'

import { AdminProductForm } from '@/sections/admin'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Товар',
}

export default async function AdminProduct({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  await requireAdmin()

  return <AdminProductForm searchParams={searchParams} />
}
