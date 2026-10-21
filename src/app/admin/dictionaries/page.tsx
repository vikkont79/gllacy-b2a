import type { Metadata } from 'next'

import { AdminDictionaries } from '@/sections/admin-dictionaries'
import { requireAdmin } from '@/shared/lib/requireAdmin'

export const metadata: Metadata = {
  title: 'Справочники',
}

export default async function DictionariesPage() {
  await requireAdmin()

  return <AdminDictionaries />
}
