/*
 * Событие «корзина изменилась» живёт в shared, а не в features/cart: его шлют
 * и корзина, и авторизация (после выхода бейдж должен обнулиться). Импорт из
 * features/cart в features/auth был бы зависимостью фичи от фичи.
 */
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
