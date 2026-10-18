import { describe, expect, it } from 'vitest'

import { getAuthErrorMessage } from './authErrors'

describe('getAuthErrorMessage', () => {
  it('переводит известный код в понятный текст', () => {
    expect(getAuthErrorMessage('INVALID_TOKEN', null)).toBe(
      'Ссылка истекла или уже использована. Запросите новую.',
    )
    expect(getAuthErrorMessage('new_user_signup_disabled', null)).toBe(
      'Регистрация по ссылке закрыта.',
    )
  })

  it('для неизвестного кода берёт описание из редиректа', () => {
    expect(getAuthErrorMessage('SOMETHING_NEW', 'Что-то пошло не так')).toBe(
      'Что-то пошло не так',
    )
  })

  it('для неизвестного кода без описания даёт общий текст', () => {
    expect(getAuthErrorMessage('SOMETHING_NEW', null)).toBe(
      'Не удалось войти. Запросите ссылку ещё раз.',
    )
  })
})