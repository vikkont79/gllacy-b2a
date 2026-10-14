import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/shared/lib/auth'

export const metadata: Metadata = {
  title: 'Админка',
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  // Роль уже проверена в proxy: сюда админ доходит только с role = admin.
  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className="title">Админка</h1>
      <p>Заглушка: проверка входа и роли работает. Разделы появятся в вертикали 6.</p>
      <dl>
        <dt>Имя</dt>
        <dd>{user?.name}</dd>
        <dt>Почта</dt>
        <dd>{user?.email}</dd>
        <dt>Роль</dt>
        <dd>{user?.role}</dd>
      </dl>
    </main>
  )
}