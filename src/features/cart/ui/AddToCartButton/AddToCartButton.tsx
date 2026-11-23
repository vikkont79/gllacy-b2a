'use client'

import { useTransition } from 'react'
import { toast } from 'sonner'

import { IconButton } from '@/shared/ui'

import { addToCart } from '../../api/addToCart'
import { notifyCartChanged } from '../../lib'
import styles from './AddToCartButton.module.css'

interface AddToCartButtonProps {
  productId: number
  disabled?: boolean
  iconOnly?: boolean
  className?: string
}

const AddToCartButton = ({
  productId,
  disabled = false,
  iconOnly = false,
  className = '',
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const result = await addToCart(productId)

      if (!result.success) {
        toast.error(result.error)
        return
      }

      toast.success(`В корзине ${result.quantity} кг`)
      notifyCartChanged(result.count)
    })
  }

  if (iconOnly) {
    return (
      <IconButton
        className={`${styles.iconOnly} ${className}`.trim()}
        icon="cart"
        iconSize={16}
        variant="secondary"
        iconLabel="Добавить в корзину"
        onClick={handleClick}
        disabled={disabled || isPending}
      />
    )
  }

  return (
    <IconButton
      className={className}
      icon="cart"
      iconSize={20}
      iconPosition="right"
      variant="secondary"
      onClick={handleClick}
      disabled={disabled || isPending}
    >
      Добавить в корзину
    </IconButton>
  )
}

export { AddToCartButton }
