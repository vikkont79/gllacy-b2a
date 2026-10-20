'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Controller,
  useForm,
  useWatch,
  type DefaultValues,
} from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

import {
  CATEGORY_LABELS,
  PRODUCT_IMAGE_OPTIONS,
  PRODUCT_IMAGE_VALUES,
  TOPPING_KIND_OPTIONS,
  isMarkerTopping,
  slugify,
} from '@/entities/product/lib'
import type {
  AdminProductDetails,
  FlavourOption,
  ProductTopping,
} from '@/entities/product/types'
import { BASE_VALUES } from '@/shared/config'
import { Button, Input, Select, Textarea, Toggle } from '@/shared/ui'

import { saveProduct } from '../../api/saveProduct'
import { productFormSchema, type ProductFormValues } from '../../types'
import styles from './ProductForm.module.css'

type ProductFormInput = z.input<typeof productFormSchema>

const BASE_OPTIONS = BASE_VALUES.map((value) => ({
  value,
  label: CATEGORY_LABELS[value],
}))

const TOGGLE_LABEL_STYLE: React.CSSProperties = { textTransform: 'none' }

const toNumber = (value: unknown) => {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value !== 'string' || value.trim() === '') {
    return undefined
  }

  return Number(value.replace(',', '.'))
}

interface ProductFormProps {
  product: AdminProductDetails | null
  flavours: FlavourOption[]
  toppings: ProductTopping[]
}

const ProductForm = ({ product, flavours, toppings }: ProductFormProps) => {
  const router = useRouter()
  const isEdit = product !== null
  const [slugEdited, setSlugEdited] = useState(isEdit)
  const [serverError, setServerError] = useState<string>()

  const defaultValues: DefaultValues<ProductFormInput> = product
    ? {
        name: product.name,
        slug: product.slug,
        base: product.base,
        flavourId: product.flavourId,
        price: product.price / 100,
        calories: product.calories,
        protein: product.protein,
        fat: product.fat,
        carbs: product.carbs,
        shelfLife: product.shelfLife,
        image: product.image as ProductFormValues['image'],
        description: product.description,
        composition: product.composition,
        isAvailable: product.isAvailable,
        isNew: product.isNew,
        toppingIds: product.toppingIds,
      }
    : {
        base: 'plombir',
        flavourId: flavours[0]?.id,
        image: PRODUCT_IMAGE_VALUES[0],
        isAvailable: true,
        isNew: false,
        toppingIds: [],
      }

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  })

  const nameValue = useWatch({ control, name: 'name' })
  const imageValue = useWatch({ control, name: 'image' })

  useEffect(() => {
    if (isEdit || slugEdited) {
      return
    }

    setValue('slug', slugify(typeof nameValue === 'string' ? nameValue : ''))
  }, [isEdit, nameValue, setValue, slugEdited])

  const slugField = register('slug')

  const onSubmit = async (values: ProductFormValues) => {
    setServerError(undefined)

    try {
      const result = await saveProduct(product?.id ?? null, values)

      if (!result.success) {
        setServerError(result.error)
        toast.error(result.error)
        return
      }

      toast.success(isEdit ? 'Товар сохранён' : 'Товар создан')
      router.push('/admin')
      router.refresh()
    } catch {
      setServerError('Не удалось сохранить товар')
      toast.error('Не удалось сохранить товар')
    }
  }

  const flavourOptions = flavours.map((flavour) => ({
    value: String(flavour.id),
    label: flavour.name,
  }))

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={isSubmitting}
      noValidate
    >
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Основное</legend>

        <div className={styles.grid}>
          <Input
            label="Название"
            readOnly={isEdit}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Адрес страницы"
            readOnly={isEdit}
            error={errors.slug?.message}
            {...slugField}
            onChange={(event) => {
              setSlugEdited(true)
              slugField.onChange(event)
            }}
          />
          <Controller
            control={control}
            name="base"
            render={({ field }) => (
              <Select
                label="Основа"
                options={BASE_OPTIONS}
                value={String(field.value ?? '')}
                onChange={(event) => field.onChange(event.target.value)}
                disabled={isEdit}
                error={errors.base?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="flavourId"
            render={({ field }) => (
              <Select
                label="Вкус"
                placeholder="Выберите вкус"
                options={flavourOptions}
                value={String(field.value ?? '')}
                onChange={(event) => field.onChange(event.target.value)}
                disabled={isEdit}
                error={errors.flavourId?.message}
              />
            )}
          />
        </div>

        <div className={styles.image}>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <Select
                className={styles.imageField}
                label="Картинка"
                options={PRODUCT_IMAGE_OPTIONS}
                value={String(field.value ?? '')}
                onChange={(event) => field.onChange(event.target.value)}
                error={errors.image?.message}
              />
            )}
          />
          {imageValue && (
            <Image
              className={styles.preview}
              src={`/${String(imageValue)}`}
              alt=""
              width={96}
              height={96}
            />
          )}
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Цена и пищевая ценность</legend>

        <div className={styles.grid}>
          <Input
            label="Цена, ₽"
            type="text"
            inputMode="decimal"
            error={errors.price?.message}
            {...register('price', { setValueAs: toNumber })}
          />
          <Input
            label="Калорийность, ккал"
            type="text"
            inputMode="numeric"
            error={errors.calories?.message}
            {...register('calories', { setValueAs: toNumber })}
          />
          <Input
            label="Белки, г"
            type="text"
            inputMode="decimal"
            error={errors.protein?.message}
            {...register('protein', { setValueAs: toNumber })}
          />
          <Input
            label="Жиры, г"
            type="text"
            inputMode="decimal"
            error={errors.fat?.message}
            {...register('fat', { setValueAs: toNumber })}
          />
          <Input
            label="Углеводы, г"
            type="text"
            inputMode="decimal"
            error={errors.carbs?.message}
            {...register('carbs', { setValueAs: toNumber })}
          />
          <Input
            label="Срок хранения, сут"
            type="text"
            inputMode="numeric"
            error={errors.shelfLife?.message}
            {...register('shelfLife', { setValueAs: toNumber })}
          />
        </div>
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Описание</legend>

        <Textarea
          label="Описание"
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />
        <Textarea
          label="Состав"
          rows={4}
          error={errors.composition?.message}
          {...register('composition')}
        />
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Наполнители</legend>

        {toppings.length === 0 ? (
          <p className={styles.empty}>Справочник наполнителей пуст.</p>
        ) : (
          <Controller
            control={control}
            name="toppingIds"
            render={({ field }) => {
              const selected = Array.isArray(field.value)
                ? (field.value as number[])
                : []

              return (
                <div className={styles.groups}>
                  {TOPPING_KIND_OPTIONS.map(({ kind, label }) => {
                    const group = toppings.filter(
                      (topping) => topping.kind === kind,
                    )

                    if (group.length === 0) {
                      return null
                    }

                    return (
                      <fieldset key={kind} className={styles.group}>
                        <legend className={styles.groupTitle}>{label}</legend>

                        <div className={styles.toppingList}>
                          {group.map((topping) => {
                            const marker = isMarkerTopping(topping)
                            const checked = selected.includes(topping.id)

                            return (
                              <Toggle
                                key={topping.id}
                                name="toppingIds"
                                variant="transparent"
                                size="small"
                                iconSize={12}
                                label={marker ? label : topping.name}
                                labelStyle={TOGGLE_LABEL_STYLE}
                                checked={checked}
                                onChange={(value) => {
                                  if (typeof value !== 'boolean') {
                                    return
                                  }

                                  field.onChange(
                                    value
                                      ? [...selected, topping.id]
                                      : selected.filter((id) => id !== topping.id),
                                  )
                                }}
                              />
                            )
                          })}
                        </div>
                      </fieldset>
                    )
                  })}
                </div>
              )
            }}
          />
        )}
      </fieldset>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Публикация</legend>

        <div className={styles.toppingList}>
          <Controller
            control={control}
            name="isAvailable"
            render={({ field }) => (
              <Toggle
                variant="transparent"
                size="small"
                iconSize={12}
                label="Показывать в каталоге"
                labelStyle={TOGGLE_LABEL_STYLE}
                checked={Boolean(field.value)}
                onChange={(value) => {
                  if (typeof value === 'boolean') {
                    field.onChange(value)
                  }
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="isNew"
            render={({ field }) => (
              <Toggle
                variant="transparent"
                size="small"
                iconSize={12}
                label="Показывать в новинках"
                labelStyle={TOGGLE_LABEL_STYLE}
                checked={Boolean(field.value)}
                onChange={(value) => {
                  if (typeof value === 'boolean') {
                    field.onChange(value)
                  }
                }}
              />
            )}
          />
        </div>
      </fieldset>

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохраняем…' : 'Сохранить'}
        </Button>
        <Button href="/admin" variant="transparent">
          Отмена
        </Button>
        {serverError && (
          <p role="alert" className={styles.error}>
            {serverError}
          </p>
        )}
      </div>
    </form>
  )
}

export { ProductForm }
