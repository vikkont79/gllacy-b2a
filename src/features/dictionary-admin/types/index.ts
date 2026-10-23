import { z } from 'zod'

import { TOPPING_KIND_VALUES } from '@/shared/config'

import { isReservedToppingName, normalizeToppingName } from '../lib/toppingName'

export const toppingNameSchema = z
  .string()
  .transform(normalizeToppingName)
  .pipe(
    z
      .string()
      .min(1, 'Введите название')
      .max(60, 'Название длиннее 60 символов')
      .regex(/^[\p{L}\p{N} -]+$/u, 'Только буквы, цифры, пробел и дефис')
      .refine((name) => !isReservedToppingName(name), {
        message: 'Это название занято маркером категории',
      }),
  )

export const toppingCreateSchema = z.object({
  kind: z.enum(TOPPING_KIND_VALUES),
  name: toppingNameSchema,
})

export type ToppingCreateValues = z.infer<typeof toppingCreateSchema>
