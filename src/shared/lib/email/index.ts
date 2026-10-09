import { env } from '@/shared/lib/env'
import { consoleSender } from './consoleSender'
import { createResendSender } from './resendSender'
import { sendMagicLink } from './sendMagicLink'
import type { EmailSender } from './types'

/**
 * Отправитель выбирается по наличию RESEND_API_KEY, а не по NODE_ENV: так в
 * разработке и на проде идёт один и тот же путь отправки, и ошибки интеграции
 * видны локально. Без ключа письма печатаются в консоль — это делает вход по
 * ссылке проверяемым без почтового провайдера.
 */
const getEmailSender = (): EmailSender => {
  if (env.RESEND_API_KEY) {
    return createResendSender(env.RESEND_API_KEY)
  }

  return consoleSender
}

export { getEmailSender, sendMagicLink }