const AUTH_ERROR_MESSAGES: Record<string, string> = {
  INVALID_TOKEN: 'Ссылка истекла или уже использована. Запросите новую.',
  new_user_signup_disabled: 'Регистрация по ссылке закрыта.',
  failed_to_create_user: 'Не удалось создать аккаунт. Попробуйте ещё раз.',
  user_not_found: 'Пользователь не найден.',
}

const FALLBACK_ERROR_MESSAGE = 'Не удалось войти. Запросите ссылку ещё раз.'

/**
 * Текст ошибки входа по коду от Better Auth. Если кода нет в справочнике,
 * берём описание из редиректа, иначе — общий текст.
 */
const getAuthErrorMessage = (code: string, description: string | null): string =>
  AUTH_ERROR_MESSAGES[code] ?? description ?? FALLBACK_ERROR_MESSAGE

export { getAuthErrorMessage }