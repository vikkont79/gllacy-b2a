import { z } from 'zod'

/**
 * Email приводится к нижнему регистру: Better Auth хранит пользователя в
 * нижнем регистре (sign-up делает toLowerCase), а magic-link сохраняет в
 * записи верификации ровно то, что прислал клиент. Без нормализации
 * «Ivan@Mail.ru» и «ivan@mail.ru» дадут двух разных пользователей.
 */
const emailField = z
  .string()
  .trim()
  .min(1, 'Введите email')
  .pipe(z.email('Некорректный email'))
  .transform((value) => value.toLowerCase())

export const magicLinkSchema = z.object({
  email: emailField,
})

export type MagicLinkValues = z.infer<typeof magicLinkSchema>