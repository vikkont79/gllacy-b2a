import type { Metadata } from 'next'
import { headers } from 'next/headers'

import { auth } from '@/shared/lib/auth'

export const metadata: Metadata = {
  title: 'Личный кабинет',
  robots: { index: false, follow: false },
}

export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const user = session?.user

  // Роль тут не проверяется: личный кабинет доступен любому вошедшему,
  // в отличие от /admin. Гейт по сессии — в proxy.
  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className="title">Личный кабинет</h1>
      <p>Заглушка: проверка входа работает. Корзина и заказы появятся в вертикали 7.</p>
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