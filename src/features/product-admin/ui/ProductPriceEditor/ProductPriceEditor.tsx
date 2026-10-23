'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { InlineInput } from '@/shared/ui'

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
      <InlineInput
        className={styles.field}
        label="Цена, ₽"
        value={editValue}
        type="text"
        inputMode="decimal"
        error={error}
        pending={isPending}
        onChange={(nextValue) => {
          setEditValue(nextValue)
          setError(undefined)
        }}
        onSave={handleSave}
        onCancel={handleClose}
      />
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
