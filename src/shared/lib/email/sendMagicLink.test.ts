import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { EmailMessage } from './types'

const send = vi.fn<(message: EmailMessage) => Promise<void>>()

vi.mock('./getEmailSender', () => ({
  getEmailSender: () => ({ send }),
}))

const { sendMagicLink } = await import('./sendMagicLink')

describe('sendMagicLink', () => {
  beforeEach(() => {
    send.mockClear()
    send.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('передаёт письмо отправителю со ссылкой и телом', async () => {
    const url = 'https://glaicy.vercel.app/api/auth/magic-link/verify?token=abc'

    await sendMagicLink('user@example.com', url)

    expect(send).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'Вход на сайт',
        url,
        html: expect.stringContaining('token=abc'),
      }),
    )
  })

  it('не печатает ссылку сам: это дело отправителя', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await sendMagicLink('user@example.com', 'https://glaicy.vercel.app/magic-link')

    expect(log).not.toHaveBeenCalled()
    expect(send).toHaveBeenCalledTimes(1)
  })

  it('экранирует кавычки в ссылке, чтобы не сломать атрибут href', async () => {
    await sendMagicLink('user@example.com', 'https://glaicy.vercel.app/x"onmouseover="alert(1)')

    const html = send.mock.calls[0]?.[0]?.html ?? ''
    expect(html).toContain('&quot;')
    expect(html).not.toContain('x"onmouseover="alert(1)')
  })

  it('отдаёт ссылку для печати сырой, экранируя её только в html', async () => {
    const url = 'https://glaicy.vercel.app/verify?token=abc&callbackURL=%2F'

    await sendMagicLink('user@example.com', url)

    expect(send.mock.calls[0]?.[0]?.url).toBe(url)
  })
})