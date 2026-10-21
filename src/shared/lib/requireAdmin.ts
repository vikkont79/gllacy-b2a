import 'server-only'

import { headers } from 'next/headers'

import { auth } from './auth'
import { isAdminRole } from './roles'

/*
 * Две функции, а не одна, потому что отказ обрабатывается по-разному:
 * странице достаточно бросить (её не должно быть в дереве), а Server Action
 * должен вернуть структурированный ответ, чтобы показать «сессия истекла»,
 * а не общее «что-то пошло не так».
 */

export const getAdminSession = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  return session && isAdminRole(session.user.role) ? session : null
}

export const requireAdmin = async () => {
  const session = await getAdminSession()

  if (!session) {
    throw new Error('Доступ к админке только для администратора')
  }

  return session
}
