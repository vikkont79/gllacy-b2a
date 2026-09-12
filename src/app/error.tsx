'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/ui'
import styles from './error.module.css'

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string }
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  const offline = typeof navigator !== 'undefined' && !navigator.onLine

  return (
    <section className={styles.error}>
      <h1 className="visually-hidden">Ошибка</h1>
      {offline ? (
        <>
          <p className={styles.title}>Похоже, нет связи с интернетом</p>
          <p className={styles.message}>Проверьте подключение и попробуйте ещё раз.</p>
        </>
      ) : (
        <>
          <p className={styles.title}>Не удалось загрузить страницу.</p>
          <p className={styles.message}>
            {process.env.NODE_ENV === 'development'
              ? error.message
              : 'Попробуйте ещё раз или загляните позже.'}
          </p>
          {error.digest ? (
            <p className={styles.digest}>Код обращения: {error.digest}</p>
          ) : null}
        </>
      )}
      <Button onClick={retry}>Попробовать ещё раз</Button>
    </section>
  )
}