export const CART_CHANGED_EVENT = 'cart:changed'

export type CartChangedDetail = {
  count: number
}

/*
 * Экшен уже вернул новое число позиций, поэтому счётчику не нужно
 * перезапрашивать сервер: он берёт count прямо из события.
 */
export const notifyCartChanged = (count: number) => {
  window.dispatchEvent(
    new CustomEvent<CartChangedDetail>(CART_CHANGED_EVENT, {
      detail: { count },
    }),
  )
}
