import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { auth } from '@/shared/lib/auth'
import { ADMIN_ROLE } from '@/shared/lib/roles'

/**
 * Сессия текущего запроса. Возвращает роль, а не только факт входа: правила
 * доступа у /admin и /account разные.
 *
 * Ответы различаются намеренно: null — сессии нет, undefined — сессию не удалось
 * проверить (база недоступна или запрос отвалился по таймауту). Гостя мы
 * отправляем на форму входа, а при недоступной базе отвечаем отказом, иначе
 * авторизованного выбрасывало бы на форму с требованием войти заново.
 */
const getSession = async (request: NextRequest) => {
  try {
    return await auth.api.getSession({ headers: request.headers })
  } catch {
    return undefined
  }
}

/** Строже, чем startsWith('/admin'): раздел /administrator не должен попасть под админские правила */
const isAdminSection = (pathname: string): boolean =>
  pathname === '/admin' || pathname.startsWith('/admin/')

/**
 * Гейт приватных разделов. Гостя отправляем на форму входа — иначе петля: он
 * не сможет войти, потому что для входа нужно попасть на страницу, которая его
 * не пускает.
 */
export async function proxy(request: NextRequest) {
  const session = await getSession(request)
  const { pathname, search } = request.nextUrl

  if (session === undefined) {
    // Сессию проверить не удалось: пускать нельзя, но и врать про авторизацию
    // тоже — отвечаем отказом, а не формой входа.
    return new NextResponse('Сервис временно недоступен, попробуйте позже', {
      status: 503,
      headers: { 'Retry-After': '30' },
    })
  }

  if (session && (!isAdminSection(pathname) || session.user.role === ADMIN_ROLE)) {
    return NextResponse.next()
  }

  const url = new URL('/', request.url)

  if (session) {
    // Сюда попадает только /admin с чужой ролью: в /account любая сессия
    // прошла выше. Повторный вход ничего не даст, поэтому без from — иначе
    // тот же человек снова окажется здесь.
    url.searchParams.set('auth', 'denied')
  } else {
    url.searchParams.set('auth', 'open')
    url.searchParams.set('from', pathname + search)
  }

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*', '/account/:path*'],
}