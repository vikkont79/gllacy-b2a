'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { ProductTopping } from '@/entities/product/types'
import { ConfirmModal, IconButton } from '@/shared/ui'

import { deleteTopping } from '../../api/deleteTopping'
import { formatProductCount } from '../../lib'

interface ToppingDeleteProps {
  readonly topping: ProductTopping
  readonly label: string
  readonly productCount: number
  readonly className?: string
}

const ToppingDelete = ({
  topping,
  label,
  productCount,
  className,
}: ToppingDeleteProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const modalId = `delete-topping-${topping.id}`

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteTopping(topping.id)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success('Наполнитель удалён')
      router.refresh()
    })
  }

  const message =
    productCount > 0
      ? `Наполнитель используется в ${formatProductCount(productCount)}. Если это последний наполнитель вида «${label}» у товара, товар перестанет попадать в фильтр «${label}». Проверьте состав и описание этих товаров.`
      : 'Наполнитель не используется ни в одном товаре.'

  return (
    <>
      <IconButton
        className={className}
        icon="cross"
        variant="transparent"
        size="small"
        iconSize={12}
        iconLabel={`Удалить ${topping.name}`}
        popoverTarget={modalId}
        disabled={isPending}
      />
      <ConfirmModal
        id={modalId}
        title={`Удалить «${topping.name}»?`}
        message={message}
        confirmLabel="Удалить"
        pending={isPending}
        onConfirm={handleDelete}
      />
    </>
  )
}

export { ToppingDelete }
