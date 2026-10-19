import { z } from 'zod'

import { PRODUCT_IMAGE_VALUES } from '@/entities/product/lib'
import { BASE_VALUES } from '@/shared/config/product'

const nameField = z
  .string()
  .trim()
  .min(1, 'Укажите название')
  .max(120, 'Название длиннее 120 символов')

const slugField = z
  .string()
  .trim()
  .min(1, 'Укажите адрес страницы')
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'Только строчные латинские буквы, цифры и дефис между ними',
  )

const priceField = z.coerce
  .number({ error: 'Введите цену числом' })
  .positive('Цена должна быть больше нуля')

const flavourField = z.coerce
  .number({ error: 'Выберите вкус' })
  .int()
  .positive('Выберите вкус')

const caloriesField = z.coerce
  .number({ error: 'Введите калорийность числом' })
  .int('Калорийность — целое число')
  .nonnegative('Калорийность не может быть отрицательной')

const proteinField = z.coerce
  .number({ error: 'Введите белки числом' })
  .nonnegative('Белки не могут быть отрицательными')

const fatField = z.coerce
  .number({ error: 'Введите жиры числом' })
  .nonnegative('Жиры не могут быть отрицательными')

const carbsField = z.coerce
  .number({ error: 'Введите углеводы числом' })
  .nonnegative('Углеводы не могут быть отрицательными')

const shelfLifeField = z.coerce
  .number({ error: 'Введите срок хранения числом' })
  .int('Срок хранения — целое число')
  .positive('Срок хранения должен быть больше нуля')

/*
 * Одна схема на создание и правку. Идентичность (name, slug, base,
 * flavourId) в режиме правки readonly, но всё равно уходит в action;
 * saveProduct просто не обновляет эти поля у существующего товара.
 *
 * Цена здесь в рублях. В копейки переводит только action, форма про
 * копейки не знает.
 *
 * Без .default(): RHF всегда передаёт isAvailable/isNew/toppingIds,
 * а совпадение input и output типов избавляет zodResolver от сюрпризов.
 */
export const productFormSchema = z.object({
  name: nameField,
  slug: slugField,
  base: z.enum(BASE_VALUES),
  flavourId: flavourField,
  price: priceField,
  calories: caloriesField,
  protein: proteinField,
  fat: fatField,
  carbs: carbsField,
  shelfLife: shelfLifeField,
  image: z.enum(PRODUCT_IMAGE_VALUES),
  description: z.string().trim().min(1, 'Укажите описание'),
  composition: z.string().trim().min(1, 'Укажите состав'),
  isAvailable: z.boolean(),
  isNew: z.boolean(),
  toppingIds: z.array(z.coerce.number().int().positive()),
})

export type ProductFormValues = z.infer<typeof productFormSchema>
