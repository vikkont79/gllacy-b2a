import type { EmailMessage, EmailSender } from './types'

/**
 * Заглушка для сред без RESEND_API_KEY: письмо печатается в терминал
 * вместо отправки. Нужна, чтобы вход по ссылке можно было проверить локально,
 * не поднимая почтовый провайдер.
 *
 * Ссылка печатается отдельной строкой и без экранирования: из HTML её не скопировать
 * — амперсанды приходят как &amp;, и такая ссылка приводит к тому, что better-auth
 * не находит callbackURL и отдаёт вместо страницы сырой JSON с сессией.
 */
const consoleSender: EmailSender = {
  send: async (message: EmailMessage) => {
    console.log('\n========== EMAIL ==========')
    console.log(`To: ${message.to}`)
    console.log(`Subject: ${message.subject}`)
    console.log(`URL: ${message.url}`)
    console.log(`HTML:\n${message.html}`)
    console.log('=================================\n')
  },
}

export { consoleSender }