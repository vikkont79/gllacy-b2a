<!-- BEGIN:nextjs-agent-rules -->
# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
<!-- END:nextjs-agent-rules -->

# Project Rules — gllacy-b2a

Read AGENTS.md rules below before any task.

---

## Структура проекта (FSD)

| Слой | Назначение |
|------|------------|
| **`src/app/`** | Чистый роутинг Next.js App Router. Только `layout`, `page`, `loading`, `error`, `not-found`. Передача параметров (`params`, `searchParams`) в секции. Никакой бизнес-логики, компонентов, стилей. |
| **`src/sections/`** | Аналог FSD `pages`. Сборка страниц. Каждый слайс по домену (`main`, `catalog`, `profile`). Подключает виджеты, фичи, сущности. Не путать с `app/`. |
| **`src/widgets/`** | Крупные блоки (шапка, футер, сайдбар, модалки) |
| **`src/features/`** | Пользовательские сценарии (действия, формы, интерактив) |
| **`src/entities/`** | Бизнес-сущности (пользователь, товар, заказ, отзыв) |
| **`src/shared/`** | UI-киты, API-клиенты, хуки, утилиты, константы, общие типы |
| **`public/`** | Статические файлы (изображения, шрифты) |

### Структура каждого слайса

```
src/{layer}/{domain}/
├── ui/       — компоненты и стили
├── api/      — всё, что связано с сервером (запросы, мутации, клиенты)
├── lib/      — вспомогательный код (хуки, утилиты, helpers)
└── types/    — TypeScript-типы для этого слайса
```

### Конфиги — НЕЛЬЗЯ трогать без явного запроса пользователя
- `package.json` — добавление/удаление зависимостей
- `next.config.ts` — конфигурация Next.js
- `tsconfig.json` — настройки TypeScript
- `eslint.config.mjs` — правила линтинга
- `.gitignore` — список игнорируемых файлов

### Запретные зоны (никогда не трогать)
- `node_modules/` — управляется только через pnpm
- `.next/` — билд Next.js, генерируется автоматически
- `pnpm-lock.yaml` — блокировка зависимостей
- `next-env.d.ts` — авто-генерируемый TypeScript-деклерейшн
- Файлы с секретами/токенами (`.env*` etc.)
- Любой сгенерированный/бинарный контент

---

## Рабочий процесс

### 1. Обсуждение (план-режим)
- Обсуждаем задачу, я задаю уточняющие вопросы, взвешиваем трейдоффы.
- Приходим к согласованному решению.

### 2. Показ изменений
- Я показываю новые/изменённые файлы **целиком или диффом** с подробными комментариями под ними:
  что и зачем меняется, какие были альтернативы и допуски.
- Обсуждаем, правим план, если нужно. Итерируем до согласования.

### 3. Выполнение
- Только после явного перевода в рабочий режим («Выполняй», «ОК», «Да») вношу изменения в проект.
- Без подтверждения код не пишу.

### Ускорение
- Если в запросе есть слово `"сразу"` или `"без подтверждения"` — шаги 1–2 сокращаются,
  делаю без остановок (кроме исключений ниже).

### Исключения (всегда спрашивать, даже при "сразу")
- Удаление файлов
- Изменение `package.json` / `next.config.ts` / `tsconfig.json`
- Запуск команд, которые могут изменить окружение (`pnpm install`, `git push --force`)

---

## Правила экспортов

### `src/app/` (роутинг Next.js)
- Только `export default function`
- Без стрелочных функций, без именованных экспортов
- Сигнатура как в шаблоне: `export default function Page() { ... }`

### Вне `src/app/` (компоненты, возвращающие JSX)
- Константа со стрелочной функцией и явным `return`
- Именованный экспорт в конце файла

```ts
// ✅ правильно
const ProductCard = () => {
  return <div>...</div>
}

export { ProductCard }
```

```ts
// ❌ неправильно
export default function ProductCard() { ... }
export const ProductCard = () => <div>...</div>
```

### Не-JSX-файлы (утилиты, хуки, API, константы, типы)
- Без ограничений: `export function`, `export const`, `export type` — как удобно

### Индексные файлы
- `index.ts` — в каждом сегменте (`ui/`, `lib/`, `types/`) и в каждом слайсе (`main/`, `catalog/`, `profile/`). Экспортируем только то, что предназначено для использования снаружи.

### Исключение: `api/`
- Файлы из сегмента `api/` всегда импортируются **напрямую по полному пути**, не через индексные файлы.

```ts
// ✅ правильно
import { getProducts } from '@/entities/product/api/getProducts'

// ❌ неправильно
import { getProducts } from '@/entities/product'
```

### Пример: связка app + sections

```ts
// src/app/page.tsx
import { MainPage } from '@/sections/main'

export default function Page() {
  return <MainPage />
}
```

```ts
// src/app/products/[id]/page.tsx
import { ProductSection } from '@/sections/catalog'

export default function Page({ params }: { params: { id: string } }) {
  return <ProductSection productId={params.id} />
}
```

---

## Обязательные проверки перед коммитом

1. **Lint:** `pnpm lint` — без ошибок и предупреждений
2. **Types:** `pnpm tsc --noEmit` — типы проходят проверку
3. **Tests:** `pnpm test` — юнит-тесты (`vitest run`) должны проходить. Скрипт будет добавлен вместе с vitest. Тесты — рядом с кодом, `*.test.ts`; покрываем чистую логику (валидация, утилиты)

---

## Сборка и запуск

- **Никогда не запускать** `pnpm dev` / `pnpm build` / `next start` — в окружении агента они могут падать.
- Проверка кода — только `pnpm lint` и `pnpm tsc --noEmit`.
- Дев-сервер поднимает пользователь в своём терминале.
- Билд проверяется через Vercel: каждый пуш в ветку запускает preview-деплой.

---

## Архитектурные принципы

1. **App Router + `src/`** — весь код в `src/`, маршруты — через файловую систему в `src/app/`
2. **Стили** — CSS-модули (`*.module.css`) для компонентов; глобальный `globals.css` только для дизайн-токенов (oklch-переменные), базы и сбросов. Без Tailwind.
3. **Path alias `@/`** — все импорты внутри `src/` через `@/name`, не через относительные пути (`../../`)
4. **Типизация** — strict mode TypeScript, `Readonly<>` для пропсов, типы выносить в отдельные файлы при разрастании
5. **Шрифты** — через `next/font/google` с CSS-переменной проекта (`--font-inter`)
6. **Темы** — через CSS-переменные и `prefers-color-scheme`
7. **pnpm** — только pnpm для управления зависимостями (не npm/yarn)

---

## Правило: проверка API

Перед созданием файлов конфигурации (drizzle.config.ts, next.config.ts и т.д.) — **проверять актуальный API** зависимости:
- `node_modules/{package}/package.json` — версия
- `node_modules/{package}/dist/` — типы/документация
- npm-страница или оф. доки, если типов недостаточно

Не полагаться на предыдущий опыт — API мог измениться.

## Заметки по стеку

Актуальные версии — см. `package.json`. Ключевое: Next.js 16 (App Router), React 19, ESLint Flat Config (`eslint.config.mjs`).

## Окружение (bash-команды)

Проект лежит на WSL-файловой системе, но bash-инструмент запускает PowerShell.
Исполняемые файлы в WSL недоступны в PATH из PowerShell. Запускать через `wsl <full-path>`:

- `pnpm`: `/home/vikkont/.local/share/pnpm/pnpm`
- `node`: `/home/vikkont/.local/share/pnpm/nodejs/22.21.1/bin/node`

Пример установки зависимости:
```powershell
wsl /home/vikkont/.local/share/pnpm/pnpm add package-name
```
