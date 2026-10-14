/** Роль администратора в таблице user. Единственный источник имени роли. */
export const ADMIN_ROLE = 'admin'

export const isAdminRole = (role: string | null | undefined): boolean => role === ADMIN_ROLE