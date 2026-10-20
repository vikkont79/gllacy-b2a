'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './AdminNav.module.css'

const TABS = [
  { href: '/admin/products', label: 'Товары' },
  { href: '/admin/orders', label: 'Заказы' },
  { href: '/admin/clients', label: 'Клиенты' },
] as const

const AdminNav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav} aria-label="Разделы админки">
      <ul className={styles.list}>
        {TABS.map(({ href, label }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`)

          return (
            <li key={href} className={styles.item}>
              <Link
                className={`${styles.link} ${isActive ? styles.active : ''}`.trim()}
                href={href}
                prefetch={false}
                aria-current={isActive ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { AdminNav }
