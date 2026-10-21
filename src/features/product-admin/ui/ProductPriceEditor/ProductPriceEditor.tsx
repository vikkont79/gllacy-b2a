'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { IconButton, Input } from '@/shared/ui'

import { updateProductPrice } from '../../api/updateProductPrice'
import { formatPrice } from '../../lib'
import { productPriceSchema } from '../../types'
import styles from './ProductPriceEditor.module.css'

interface ProductPriceEditorProps {
  productId: number
  price: number
}

const ProductPriceEditor = ({ productId, price }: ProductPriceEditorProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()

  const handleEdit = () => {
    setEditValue(String(price / 100))
    setError(undefined)
    setIsEditing(true)
  }

  const handleClose = () => {
    if (isPending) return

    setError(undefined)
    setIsEditing(false)
  }

  const handleSave = () => {
    if (isPending) return

    const parsed = productPriceSchema.safeParse({
      price: editValue.replace(',', '.'),
    })

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Проверьте цену')
      return
    }

    if (parsed.data.price === price / 100) {
      handleClose()
      return
    }

    startTransition(async () => {
      const result = await updateProductPrice(productId, parsed.data.price)

      if (!result.success) {
        setError(result.error)
        return
      }

      toast.success('Цена обновлена')
      setError(undefined)
      setIsEditing(false)
      router.refresh()
    })
  }

  if (isEditing) {
    return (
      <div className={styles.editField} aria-busy={isPending}>
        <div className={styles.field}>
          <Input
            label="Цена, ₽"
            hiddenLabel
            size="small"
            type="text"
            inputMode="decimal"
            value={editValue}
            onChange={(event) => {
              setEditValue(event.target.value)
              setError(undefined)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter') handleSave()
              if (event.key === 'Escape') handleClose()
            }}
            autoFocus
            disabled={isPending}
            error={error}
          />
        </div>
        <IconButton
          icon="check"
          variant="transparent"
          iconSize={16}
          iconLabel="Сохранить"
          onClick={handleSave}
          disabled={isPending}
        />
        <IconButton
          icon="cross"
          variant="transparent"
          iconSize={16}
          iconLabel="Отмена"
          onClick={handleClose}
          disabled={isPending}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      className={styles.priceButton}
      onClick={handleEdit}
      aria-label={`Изменить цену: ${formatPrice(price)}`}
    >
      {formatPrice(price)}
    </button>
  )
}

export { ProductPriceEditor }
