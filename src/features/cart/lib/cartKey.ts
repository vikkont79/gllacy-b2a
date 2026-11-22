const CART_KEY_PREFIX = 'cart:'

export const cartKey = (guestId: string) => `${CART_KEY_PREFIX}${guestId}`
