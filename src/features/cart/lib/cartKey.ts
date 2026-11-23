const CART_KEY_PREFIX = 'gllacy:cart:'

/*
 * Разные пространства для гостя и аккаунта — не косметика. Пользователь может
 * выставить себе cookie cart_id в любое значение (httpOnly мешает читать, но не
 * мешает подменить через devtools). Без префиксов подмена на чужой userId
 * сделала бы гостевой ключ ключом чужой корзины; с префиксами это невозможно.
 */
export const guestCartKey = (guestId: string) =>
  `${CART_KEY_PREFIX}guest:${guestId}`

export const userCartKey = (userId: string) =>
  `${CART_KEY_PREFIX}user:${userId}`
