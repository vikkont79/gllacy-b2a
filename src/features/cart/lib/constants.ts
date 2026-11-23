export const CART_MIN_KG = 1
export const CART_MAX_KG = 99
export const CART_TTL_SECONDS = 60 * 60 * 24 * 30
// Корзина аккаунта живёт дольше: она привязана к пользователю, а не к браузеру.
export const CART_USER_TTL_SECONDS = 60 * 60 * 24 * 90
export const CART_COOKIE_NAME = 'cart_id'
export const CART_COUNT_REFRESH_MS = 30_000
