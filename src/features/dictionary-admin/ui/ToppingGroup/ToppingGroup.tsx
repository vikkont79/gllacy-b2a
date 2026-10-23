'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button, InlineInput } from '@/shared/ui'

import { createTopping } from '../../api/createTopping'
import type { ToppingGroupData } from '../../lib'
import { toppingNameSchema } from '../../types'
import { ToppingDelete } from '../ToppingDelete/ToppingDelete'
import styles from './ToppingGroup.module.css'

interface ToppingGroupProps {
  readonly group: ToppingGroupData
  readonly usage: Record<number, number>
}

const ToppingGroup = ({ group, usage }: ToppingGroupProps) => {
  const router = useRouter()
  const [isCreating, setIsCreating] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState<string>()
  const [isPending, startTransition] = useTransition()

  const handleStart = () => {
    setValue('')
    setError(undefined)
    setIsCreating(true)
  }

  const handleCancel = () => {
    if (isPending) {
      return
    }

    setIsCreating(false)
    setError(undefined)
  }

  const handleSave = () => {
    if (isPending) {
      return
    }

    const parsed = toppingNameSchema.safeParse(value)

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Проверьте название')
      return
    }

    startTransition(async () => {
      const result = await createTopping(group.kind, parsed.data)

      if (!result.success) {
        setError(result.error)
        toast.error(result.error)
        return
      }

      toast.success('Наполнитель добавлен')
      setIsCreating(false)
      setValue('')
      setError(undefined)
      router.refresh()
    })
  }

  return (
    <section className={styles.group} aria-labelledby={`group-${group.kind}`}>
      <h2 id={`group-${group.kind}`} className={styles.title}>
        {group.label}
      </h2>

      <ul className={styles.list}>
        {group.items.map((topping) => (
          <li key={topping.id} className={styles.chip}>
            <span className={styles.name}>{topping.name}</span>
            <ToppingDelete
              topping={topping}
              label={group.label}
              productCount={usage[topping.id] ?? 0}
              className={styles.remove}
            />
          </li>
        ))}

        <li className={styles.chip}>
          {isCreating ? (
            <InlineInput
              className={styles.createField}
              label={`Новый наполнитель: ${group.label}`}
              value={value}
              error={error}
              pending={isPending}
              onChange={(nextValue) => {
                setValue(nextValue)
                setError(undefined)
              }}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <Button variant="transparent" size="small" onClick={handleStart}>
              Создать
            </Button>
          )}
        </li>
      </ul>
    </section>
  )
}

export { ToppingGroup }
