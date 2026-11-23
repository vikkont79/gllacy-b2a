const CART_KEY_PREFIX = 'gllacy:cart:'

export const cartKey = (guestId: string) => `${CART_KEY_PREFIX}${guestId}`
