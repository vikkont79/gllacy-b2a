import type { EmailMessage, EmailSender } from './types'

/**
 * Заглушка для сред без RESEND_API_KEY: письмо печатается в терминал
 * вместо отправки. Нужен, чтобы вход по ссылке можно было проверить локально,
 * не поднимая почтовый провайдер.
 */
const consoleSender: EmailSender = {
  send: async (message: EmailMessage) => {
    console.log('\n========== EMAIL (dev) ==========')
    console.log(`To: ${message.to}`)
    console.log(`Subject: ${message.subject}`)
    console.log(`HTML:\n${message.html}`)
    console.log('=================================\n')
  },
}

export { consoleSender }