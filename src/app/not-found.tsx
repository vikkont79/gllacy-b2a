import type { Metadata } from 'next'

import { Button } from '@/shared/ui'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Страница не найдена',
  description: 'Такой страницы нет. Загляните в каталог — там все вкусы.',
}

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <h1 className={styles.title}>Такой страницы нет</h1>
      <p className={styles.message}>
        Возможно, вкус ушёл в просрок или адрес набран с опечаткой. Загляните в каталог — там
        всё, что сейчас готовим.
      </p>
      <Button href="/products" variant="secondary">
        В каталог
      </Button>
    </section>
  )
}