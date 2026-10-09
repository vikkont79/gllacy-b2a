import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { EmailMessage } from './types'

const send = vi.fn<(message: EmailMessage) => Promise<void>>()

vi.mock('./index', () => ({
  getEmailSender: () => ({ send }),
}))

vi.mock('@/shared/lib/env', () => ({
  env: { NODE_ENV: 'development', RESEND_API_KEY: 'test' },
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

  it('передаёт письмо отправителю с ссылкой в теле', async () => {
    await sendMagicLink('user@example.com', 'https://glaicy.vercel.app/api/auth/magic-link/verify?token=abc')

    expect(send).toHaveBeenCalledTimes(1)
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'user@example.com',
        subject: 'Вход на сайт',
        html: expect.stringContaining('token=abc'),
      }),
    )
  })

  it('печатает ссылку в консоль в разработке', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await sendMagicLink('user@example.com', 'https://glaicy.vercel.app/magic-link')

    const printed = log.mock.calls.flat().join('\n')
    expect(printed).toContain('MAGIC LINK (dev)')
    expect(printed).toContain('https://glaicy.vercel.app/magic-link')
  })

  it('не печатает ссылку на проде', async () => {
    vi.doMock('@/shared/lib/env', () => ({
      env: { NODE_ENV: 'production', RESEND_API_KEY: 'test' },
    }))

    vi.resetModules()
    const { sendMagicLink: sendInProd } = await import('./sendMagicLink')
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    await sendInProd('user@example.com', 'https://glaicy.vercel.app/magic-link')

    expect(log).not.toHaveBeenCalled()
    expect(send).toHaveBeenCalledTimes(1)
  })

  it('экранирует кавычки в ссылке, чтобы не сломать атрибут href', async () => {
    await sendMagicLink('user@example.com', 'https://glaicy.vercel.app/x"onmouseover="alert(1)')

    const html = send.mock.calls[0]?.[0]?.html ?? ''
    expect(html).toContain('&quot;')
    expect(html).not.toContain('x"onmouseover="alert(1)')
  })
})