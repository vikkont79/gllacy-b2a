'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

import { createCatalogUrl, FATNESS_OPTIONS, TOPPING_KIND_OPTIONS } from '@/sections/catalog/lib'
import type { Base, GetProductsOptions, Sort, ToppingKind } from '@/entities/product/types'
import { Toggle } from '@/shared/ui'

import styles from './CatalogFilter.module.css'

const SORTS: readonly Sort[] = ['cheap', 'expensive']

interface CatalogFilterProps {
  className?: string
  initialOptions: GetProductsOptions
}

const CatalogFilter = ({ className = '', initialOptions }: CatalogFilterProps) => {
  const router = useRouter()

  const [sort, setSort] = useState<Sort | undefined>(initialOptions.sort)
  const [fatness, setFatness] = useState<Base | undefined>(initialOptions.base)
  const [selectedToppings, setSelectedToppings] = useState<ToppingKind[]>(
    initialOptions.toppings ?? [],
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextOptions: GetProductsOptions = {
      base: fatness,
      isNew: initialOptions.isNew,
      sort,
      toppings: selectedToppings.length > 0 ? selectedToppings : undefined,
    }

    router.push(createCatalogUrl(nextOptions))
  }

  const handleFatnessChange = (value: boolean | string) => {
    if (typeof value === 'string') {
      setFatness(value as Base)
    }
  }

  const handleToppingChange =
    (kind: ToppingKind) => (value: boolean | string) => {
      if (typeof value !== 'boolean') return

      setSelectedToppings((current) =>
        value
          ? current.includes(kind)
            ? current
            : [...current, kind]
          : current.filter((currentKind) => currentKind !== kind),
      )
    }

  const handleReset = () => {
    router.push('/products')
  }

  return (
    <form className={`${styles.filter} ${className || ''}`.trim()} onSubmit={handleSubmit}>
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

      <fieldset className={`${styles.group} ${styles.priceGroup}`}>
        <legend className="visually-hidden">Цена.</legend>
        <div className={styles.priceInputs}>
          <label className={styles.priceLabel}>
            Цена: <input className={styles.priceInput} type="number" name="min-price" value={100} readOnly />₽
          </label>
          <label className={styles.priceLabel}>
            - <input className={styles.priceInput} type="number" name="max-price" value={500} readOnly />₽
          </label>
        </div>
        <div className={styles.rangeBlock}>
          <div className={styles.rangeScale}>
            <div className={styles.rangeBar}>
              <button className={`${styles.rangeToggle} ${styles.rangeMin}`} type="button" aria-label="Изменить минимальную цену." />
              <button className={`${styles.rangeToggle} ${styles.rangeMax}`} type="button" aria-label="Изменить максимальную цену." />
            </div>
          </div>
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

      <button className={styles.submit} type="submit">Применить</button>
      <button className={styles.submit} type="button" onClick={handleReset}>Сбросить</button>
    </form>
  )
}

export { CatalogFilter }
