/*
 * Словарь допустимых значений для products.base и toppings.kind.
 *
 * Здесь только значения. Типы Base и ToppingKind выводятся из них через typeof
 * в entities/product/types, а схема ссылается уже на эти типы через $type<>.
 *
 * Файл намеренно не содержит ни одного импорта, и добавлять импорты сюда
 * нельзя: баррель '@/shared/config' реэкспортирует этот файл и достижим из
 * клиентских компонентов, а импорт оттуда потянул бы за собой зависимости
 * серверного слоя.
 */

export const BASE_VALUES = ['plombir', 'slivochnoe', 'sorbet'] as const

export const TOPPING_KIND_VALUES = ['chunk', 'jam', 'syrup', 'sprinkle'] as const