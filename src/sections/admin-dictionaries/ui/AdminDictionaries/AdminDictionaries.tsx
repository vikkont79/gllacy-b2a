import { getToppingUsage } from '@/entities/product/api/getToppingUsage'
import { getToppings } from '@/entities/product/api/getToppings'
import type { ProductTopping } from '@/entities/product/types'
import { DictionariesPanel } from '@/features/dictionary-admin/ui'
import { ErrorState } from '@/shared/ui'

import styles from './AdminDictionaries.module.css'

const AdminDictionaries = async () => {
  let toppings: ProductTopping[] = []
  let usage: Record<number, number> = {}
  let loadError = false

  try {
    const [loadedToppings, loadedUsage] = await Promise.all([
      getToppings(),
      getToppingUsage(),
    ])

    toppings = loadedToppings
    usage = loadedUsage
  } catch (error) {
    console.error('AdminDictionaries: не удалось загрузить справочники:', error)
    loadError = true
  }

  return (
    <main id="content" tabIndex={-1} className="wrapper">
      <h1 className="title">Справочники</h1>
      <p className={styles.hint}>
        Маркеры категорий системные и не удаляются. Именованные наполнители
        хранятся без категории.
      </p>

      {loadError ? (
        <ErrorState message="Не удалось загрузить справочники. Попробуйте позже" />
      ) : (
        <DictionariesPanel toppings={toppings} usage={usage} />
      )}
    </main>
  )
}

export { AdminDictionaries }
