import { getEmailSender } from './getEmailSender'

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
 * Отправляет письмо со ссылкой входа. Куда попадёт письмо, решает отправитель:
 * при наличии RESEND_API_KEY — в Resend, без него — в консоль, где печатается
 * и ссылка, и тело письма. Здесь условий нет намеренно: выбор отправителя —
 * единственное решение, и оно живёт в getEmailSender.
 */
const sendMagicLink = async (email: string, url: string): Promise<void> => {
  const sender = getEmailSender()

  await sender.send({
    to: email,
    subject: 'Вход на сайт',
    url,
    html: buildMagicLinkEmail(url),
  })
}

export { sendMagicLink }