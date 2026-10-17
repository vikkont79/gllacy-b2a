import { afterEach, describe, expect, it, vi } from 'vitest'
import { consoleSender } from './consoleSender'

const captureConsole = () => {
  const log = vi.spyOn(console, 'log').mockImplementation(() => {})

  return {
    log,
    output: () => log.mock.calls.flat().join('\n'),
  }
}

describe('consoleSender', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('печатает ссылку без экранирования, чтобы её можно было скопировать', async () => {
    const { output } = captureConsole()
    const url = 'https://glaicy.vercel.app/verify?token=abc&callbackURL=%2F&errorCallbackURL=%2F'

    await consoleSender.send({
      to: 'user@example.com',
      subject: 'Вход на сайт',
      url,
      html: '<a href="экранированная">Войти</a>',
    })

    expect(output()).toContain(url)
    expect(output()).not.toContain('&amp;callbackURL')
  })

  it('не подписывает вывод как разработку', async () => {
    const { output } = captureConsole()

    await consoleSender.send({
      to: 'user@example.com',
      subject: 'Вход на сайт',
      url: 'https://glaicy.vercel.app/verify?token=abc',
      html: '',
    })

    expect(output()).toContain('========== EMAIL ==========')
    expect(output()).not.toContain('(dev)')
  })

  it('печатает получателя, тему и тело письма', async () => {
    const { output } = captureConsole()

    await consoleSender.send({
      to: 'user@example.com',
      subject: 'Вход на сайт',
      url: 'https://glaicy.vercel.app/verify?token=abc',
      html: '<p>тело письма</p>',
    })

    expect(output()).toContain('user@example.com')
    expect(output()).toContain('Вход на сайт')
    expect(output()).toContain('<p>тело письма</p>')
  })
})