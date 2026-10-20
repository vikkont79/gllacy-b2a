'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/shared/ui'

import { setProductAvailability } from '../../api/setProductAvailability'
import { setProductNew } from '../../api/setProductNew'
import styles from './ProductRowActions.module.css'

interface ProductRowActionsProps {
  productId: number
  isAvailable: boolean
  isNew: boolean
}

const ProductRowActions = ({
  productId,
  isAvailable,
  isNew,
}: ProductRowActionsProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const run = (
    action: () => Promise<{ success: true } | { success: false; error: string }>,
    successMessage: string,
  ) => {
    startTransition(async () => {
      const result = await action()

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(successMessage)
      router.refresh()
    })
  }

  const handleToggleAvailability = () =>
    run(
      () => setProductAvailability(productId, !isAvailable),
      isAvailable ? 'Товар скрыт' : 'Товар показан',
    )

  const handleToggleNew = () =>
    run(
      () => setProductNew(productId, !isNew),
      isNew ? 'Товар убран из новинок' : 'Товар добавлен в новинки',
    )

  return (
    <div className={styles.actions}>
      <Button
        variant="transparent"
        size="small"
        onClick={handleToggleAvailability}
        disabled={isPending}
      >
        {isAvailable ? 'Скрыть' : 'Показать'}
      </Button>
      <Button
        variant="transparent"
        size="small"
        onClick={handleToggleNew}
        disabled={isPending}
      >
        {isNew ? 'Из новинок' : 'В новинки'}
      </Button>
      <Button
        href={`/admin/product?id=${productId}`}
        variant="transparent"
        size="small"
      >
        Редактировать
      </Button>
    </div>
  )
}

export { ProductRowActions }
