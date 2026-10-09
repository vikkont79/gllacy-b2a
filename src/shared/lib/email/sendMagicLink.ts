import { env } from '@/shared/lib/env'
import { getEmailSender } from './index'

const escapeHtml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const buildMagicLinkEmail = (url: string): string => `
<div style="font-family: sans-serif; line-height: 1.5;">
  <h1 style="font-size: 20px;">Вход на сайт</h1>
  <p>Нажмите на ссылку, чтобы войти. Она одноразовая и действует ограниченное время.</p>
  <p><a href="${escapeHtml(url)}" style="color: #0b5cd5;">Войти</a></p>
  <p>Если письмо пришло не по запросу, просто проигнорируйте его.</p>
</div>
`

/**
 * Отправляет письмо со ссылкой входа. В разработке ссылка дополнительно
 * печатается в терминал: отправка идёт через Resend, но в консоль попадает
 * только при NODE_ENV !== production, поэтому в прод такое письмо не утекает.
 */
const sendMagicLink = async (email: string, url: string): Promise<void> => {
  if (env.NODE_ENV !== 'production') {
    console.log(`\n========== MAGIC LINK (dev) ==========\nTo: ${email}\n${url}\n====================================\n`)
  }

  const sender = getEmailSender()

  await sender.send({
    to: email,
    subject: 'Вход на сайт',
    html: buildMagicLinkEmail(url),
  })
}

export { sendMagicLink }