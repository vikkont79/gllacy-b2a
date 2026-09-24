'use client'

import { useRef, useState, useTransition, type SubmitEvent } from 'react'
import { useRouter } from 'next/navigation'

import { createCatalogUrl, FATNESS_OPTIONS, TOPPING_KIND_OPTIONS } from '@/sections/catalog/lib'
import type { Base, GetProductsOptions, PriceBounds, Sort, ToppingKind } from '@/entities/product/types'
import { Button, Input, Toggle } from '@/shared/ui'

import styles from './CatalogFilter.module.css'

const SORTS: readonly Sort[] = ['popular', 'cheap', 'expensive']

interface PriceErrors {
  min?: string
  max?: string
}

interface CatalogFilterProps {
  className?: string
  initialOptions: GetProductsOptions
  priceBounds?: PriceBounds
}

const CatalogFilter = ({ className = '', initialOptions, priceBounds }: CatalogFilterProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [sort, setSort] = useState<Sort | undefined>(initialOptions.sort)
  const [fatness, setFatness] = useState<Base | undefined>(initialOptions.base)
  const [selectedToppings, setSelectedToppings] = useState<ToppingKind[]>(
    initialOptions.toppings ?? [],
  )
  const [priceErrors, setPriceErrors] = useState<PriceErrors>({})

  const minPriceRef = useRef<HTMLInputElement>(null)
  const maxPriceRef = useRef<HTMLInputElement>(null)

  const validatePrices = (): PriceErrors | null => {
    const minInput = minPriceRef.current?.value.trim() ?? ''
    const maxInput = maxPriceRef.current?.value.trim() ?? ''
    const min = minInput === '' ? undefined : Number(minInput)
    const max = maxInput === '' ? undefined : Number(maxInput)

    const isValidPrice = (value: number | undefined): value is number =>
      value !== undefined && Number.isInteger(value) && value >= 0

    const errors: PriceErrors = {}

    if (min !== undefined && !isValidPrice(min)) {
      errors.min = 'Введите целое число'
    }
    if (max !== undefined && !isValidPrice(max)) {
      errors.max = 'Введите целое число'
    }
    if (isValidPrice(min) && isValidPrice(max) && min > max) {
      errors.max = 'Не может быть меньше минимальной'
    }

    return errors.min || errors.max ? errors : null
  }

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = validatePrices()
    if (errors) {
      setPriceErrors(errors)
      return
    }

    const minInput = minPriceRef.current?.value.trim() ?? ''
    const maxInput = maxPriceRef.current?.value.trim() ?? ''

    const nextOptions: GetProductsOptions = {
      base: fatness,
      isNew: initialOptions.isNew,
      sort,
      toppings: selectedToppings.length > 0 ? selectedToppings : undefined,
      minPrice: minInput !== '' ? Math.round(Number(minInput) * 100) : undefined,
      maxPrice: maxInput !== '' ? Math.round(Number(maxInput) * 100) : undefined,
    }

    startTransition(() => {
      router.push(createCatalogUrl(nextOptions))
    })
  }

  const handleFatnessChange = (value: boolean | string) => {
    if (typeof value === 'string') {
      setFatness(value as Base)
    }
  }

  const handleToppingChange = (kind: ToppingKind) => (value: boolean | string) => {
    if (typeof value !== 'boolean') return

    setSelectedToppings((current) =>
      value
        ? current.includes(kind)
          ? current
          : [...current, kind]
        : current.filter((currentKind) => currentKind !== kind),
    )
  }

  const handleMinPriceChange = () => {
    if (priceErrors.min) {
      setPriceErrors((current) => ({ ...current, min: undefined }))
    }
  }

  const handleMaxPriceChange = () => {
    if (priceErrors.max) {
      setPriceErrors((current) => ({ ...current, max: undefined }))
    }
  }

  const handleReset = () => {
    if (minPriceRef.current) minPriceRef.current.value = ''
    if (maxPriceRef.current) maxPriceRef.current.value = ''
    setPriceErrors({})

    startTransition(() => {
      router.push('/products')
    })
  }

  return (
    <form
      className={`${styles.filter} ${className || ''}`.trim()}
      onSubmit={handleSubmit}
      inert={isPending}
      aria-busy={isPending}
    >
      <fieldset className={styles.group}>
        <legend className={styles.title}>Сортировка:</legend>
        <div className={styles.select}>
          <label className="visually-hidden" htmlFor="taste-sorting">Сортировка товаров каталога.</label>
          <select
            className={styles.selectControl}
            id="taste-sorting"
            name="sort"
            value={sort ?? 'popular'}
            onChange={(event) => {
              const value = event.target.value
              setSort((SORTS as readonly string[]).includes(value) ? (value as Sort) : undefined)
            }}
          >
            <option value="popular">по популярности</option>
            <option value="cheap">сначала дешёвые</option>
            <option value="expensive">сначала дорогие</option>
          </select>
        </div>
      </fieldset>

      <fieldset className={styles.group}>
        <legend className={styles.title}>Цена:</legend>
              <div className={styles.priceInputs}>                  
          <Input
            ref={minPriceRef}
            className={styles.priceInput}
            label="От"
            type="number"
            size="small"
            min={0}
            step={1}
            defaultValue={
              initialOptions.minPrice != null
                ? String(initialOptions.minPrice / 100)
                : ''
            }
            placeholder={priceBounds ? String(priceBounds.minPrice / 100) : undefined}
            error={priceErrors.min}
            onChange={handleMinPriceChange}
                  />
                  ₽                  
          <Input
            ref={maxPriceRef}
            className={styles.priceInput}
            label="до"            
            type="number"
            size="small"
            min={0}
            step={1}
            defaultValue={
              initialOptions.maxPrice != null
                ? String(initialOptions.maxPrice / 100)
                : ''
            }
            placeholder={priceBounds ? String(priceBounds.maxPrice / 100) : undefined}
            error={priceErrors.max}
            onChange={handleMaxPriceChange}
                  />
                  ₽
        </div>
      </fieldset>

      <fieldset className={`${styles.group} ${styles.fatnessGroup}`}>
        <legend className={styles.title}>Жирность:</legend>
        <ul className={styles.controlsList}>
          {FATNESS_OPTIONS.map((option) => (
            <li key={option.base}>
              <Toggle
                label={option.label}
                name="fatness"
                value={option.base}
                type="radio"
                checked={fatness === option.base}
                onChange={handleFatnessChange}
                variant="transparent"
                size="small"
                iconSize={16}
              />
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={`${styles.group} ${styles.fillerGroup}`}>
        <legend className={styles.title}>Наполнители:</legend>
        <ul className={styles.controlsList}>
          {TOPPING_KIND_OPTIONS.map((option) => (
            <li key={option.kind}>
              <Toggle
                label={option.label}
                name="toppings"
                value={option.kind}
                type="checkbox"
                checked={selectedToppings.includes(option.kind)}
                onChange={handleToppingChange(option.kind)}
                variant="transparent"
                size="small"
                iconSize={16}
              />
            </li>
          ))}
        </ul>
      </fieldset>

      <Button
        className={styles.submit}
        type="submit"
        variant="outline"
        size="small"
        disabled={isPending}
      >
        Применить
      </Button>
      <Button
        className={styles.submit}
        type="button"
        variant="outline"
        size="small"
        disabled={isPending}
        onClick={handleReset}
      >
        Сбросить
      </Button>
    </form>
  )
}

export { CatalogFilter }
