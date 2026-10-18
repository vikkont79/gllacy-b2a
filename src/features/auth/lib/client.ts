import { inferAdditionalFields, adminClient, magicLinkClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'

import { auth } from '@/shared/lib/auth'

export const authClient = createAuthClient({
  // baseURL не задаём: клиент сам подставляет /api/auth — путь нашего роута.
  // BETTER_AUTH_URL здесь не годится, это адрес сервера, а не текущий origin.
  plugins: [
    magicLinkClient(),
    adminClient(),
    // role в схеме admin-плагина помечен input: false и наружу не отдаётся.
    // Без этого плагина клиент не увидит роль и не сможет отличить админа.
    inferAdditionalFields<typeof auth>(),
  ],
})

const { getSession, signOut } = authClient

export { getSession, signOut }